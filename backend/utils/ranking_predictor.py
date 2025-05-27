# utils/ranking_predictor.py
def estimate_ranking_impact(fixes):
    weights = {
        "missing_h1": 5,
        "alt_text_missing": 3,
        "no_meta_description": 4,
        "no_canonical": 2,
        "many_inline_styles": 1,
    }

    impact_score = 0
    for issue in fixes:
        impact_score += weights.get(issue, 0)
    
    return min(impact_score, 15)  # Cap at 15%
