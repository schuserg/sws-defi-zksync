def format_amount(value):
    """Convert raw token value (in wei) to float."""
    return float(value) / 1e18 if isinstance(value, int) else value

