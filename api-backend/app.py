import json
from flask import Flask, render_template, request, redirect, url_for, send_file, abort
from utility import *
from datetime import datetime, timedelta
import os
import pandas as pd
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv


load_dotenv()
app = Flask(__name__)
CORS(app)

# ================= Global Parameters ============= #
train_results = pd.read_csv("./results/train_predictions.csv")
eval_results = pd.read_csv("./results/eval_predictions.csv")
# ================================================= #

@app.route("/")
def index():
    return "<h1>Welcome to Demand Forecasting Portal!</h1>"

@app.route("/api/v1/drop_down_data", methods = ["GET", "POST"])
@cross_origin(origins='*')
def drop_down_data():
    if request.method == "POST" or request.method == "GET":
        # Weeks identifier for the forecast horizon.
        weeks = eval_results["week"].unique().tolist()
        weeks = ["week " + str(week_id) for week_id in weeks] + ["All"]

        # Products for which the demand forecasts has been generated
        products = eval_results["item_id"].unique().tolist()
        products_map = [{"id" : i, "name" : i.replace('_', ' ')} for i in products] + [{"id" : "All", "name" : "All"}]

        result = {
            "weeks" : weeks,
            "products" : products_map
        }

        return result
    else:
        return abort(400)

@app.route("/api/v1/eval_results", methods = ["GET", "POST"])
@cross_origin(origins='*')
def eval_results_data():
    if request.method == "POST" or request.method == "GET":
        # Provide the Product and Week Filter
        request_params = request.json
        
        # Collect the request paramaters
        week = request_params["week"]
        product = request_params["product_id"]

        # Result data frame preprocessing
        result = eval_results.copy(deep = True)
        result["week"] = result["week"].apply(lambda x : "week "+str(x))
        
        # Week Filter
        if week != 'All':
            result = result[result["week"] == week]

        # Product Filter
        if product != 'All':
            result = result[result["item_id"] == product]
        
        # Result Aggregation
        result = result.groupby("week").agg({
            "in_stock_p" : "mean",
            "fill_rate" : "mean"
        }).reset_index().rename(
            columns = {
                "in_stock_p" : "inStockProbability",
                "fill_rate" : "fillRate"
            }
        )

        # Convert the result into JSON format.
        result = result.to_json(orient = "records")

        return result
    else:
        return abort(400)
    
@app.route("/api/v1/all_results", methods = ["GET", "POST"])
@cross_origin(origins='*')
def all_results_data():
    if request.method == "POST" or request.method == "GET":

        # Result data frame preprocessing
        result_part2 = eval_results.copy(deep = True)
        result_part1 = train_results.copy(deep = True)

        # Preprocessing the data
        result_part1["recordType"] = "Actual Historical"
        result_part2["recordType"] = "Forecasted"

        result_part1["inventoryLevel"] = result_part1.apply(lambda row : calculate_inventory_level(row["actual"], 0.95, row["stdev_demand"]), axis = 1)
        result_part2["inventoryLevel"] = result_part2.apply(lambda row : calculate_inventory_level(row["ensemble_predictions"], 0.95, row["stdev_demand"]), axis = 1)

        result_part1["demandLevel"] = result_part1["actual"]
        result_part2["demandLevel"] = result_part2["ensemble_predictions"]

        result_part1["productName"] = result_part1["item_id"].apply(lambda x : x.replace('_', ' '))
        result_part2["productName"] = result_part2["item_id"].apply(lambda x : x.replace('_', ' '))

        result_part1["productCategory"] = result_part1["item_id"].apply(lambda x : x.split('_')[0])
        result_part2["productCategory"] = result_part2["item_id"].apply(lambda x : x.split('_')[0])

        result_part1["date"] = result_part1["week"].replace({
            i : (datetime.strptime("2011-01-29", "%Y-%m-%d") + timedelta(days =  (i + 1) * 7)).strftime("%Y/%m/%d")
            for i in range(len(result_part1["week"].unique().tolist()))
        })

        result_part1["date"] = result_part1["week"].replace({
            i : (datetime.strptime("2011-01-29", "%Y-%m-%d") + timedelta(days =  (i + 12) * 7)).strftime("%Y/%m/%d")
            for i in range(len(result_part1["week"].unique().tolist()))
        })

        result = pd.concat([result_part1, result_part2], axis = 0, ignore_index = True)

        # Select only required columns.
        result = result[["date", "productName", "productCategory", "inventoryLevel", "demandLevel", "recordType"]]

        # Convert the result into JSON format.
        result = result.to_json(orient = "records") 

        return result
    else:
        return abort(400)
    
@app.route("/api/v1/metric_cards_data", methods = ["GET", "POST"])
@cross_origin(origins='*')
def metric_cards_data():
    if request.method == "POST" or request.method == "GET":
        # Provide the Product and Week Filter
        request_params = request.json
        
        # Collect the request paramaters
        week = request_params["week"]
        product = request_params["product_id"]

        # Result data frame preprocessing
        result = eval_results.copy(deep = True)
        result["week"] = result["week"].apply(lambda x : "week "+str(x))
        
        # Week Filter
        if week != 'All':
            result = result[result["week"] == week]

        # Product Filter
        if product != 'All':
            result = result[result["item_id"] == product]

        # Top Metrics Card calculation    

        lead_time = (result["ensemble_predictions"].mean() / result["mean_demand"].mean()) * 7

        result["inventoryLevel"] = result.apply(lambda row : calculate_inventory_level(row["ensemble_predictions"], 0.95, row["stdev_demand"]), axis = 1)
        dos = result["inventoryLevel"] / (result["ensemble_predictions"] / 7)
        dos = dos.fillna(0)
        dos = dos.mean()
        avg_inventory = result["inventoryLevel"].mean()
        avg_demand = result["ensemble_predictions"].mean()

        result =  [{
            "title": "Restock Lead Time",
            "value": f"{round(lead_time)} (Days)",
        },
        {
            "title": "Days of Supply",
            "value": f"{round(dos)} (Days)",
        },
        {
            "title": "Average Inventory",
            "value": f"{round(avg_inventory)} (Tons)",
        },
        {
            "title": "Average Demand",
            "value": f"{round(avg_demand)} (Tons)",
        }]
        return json.dumps(result)
    else:
        return abort(400)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8086, threaded=True)




