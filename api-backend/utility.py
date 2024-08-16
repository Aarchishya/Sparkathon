import scipy.stats as stats

def calculate_inventory_level(demand, instock_p, std, lead_time):
    z_score = stats.norm.ppf(instock_p)
    return (demand / 2) + (lead_time ** 0.5) * z_score * std
    # return demand * (1 + (1 / instock_p)) 
