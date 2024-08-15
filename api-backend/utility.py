import scipy.stats as stats

def calculate_inventory_level(demand, instock_p, std):
    # z_score = stats.norm.ppf(instock_p)
    # return demand * z_score * std
    return demand * (1 + (1 / instock_p)) 
