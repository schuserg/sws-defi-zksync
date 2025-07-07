import pytest
from backend.listener import format_amount

def test_format_amount_int():
    assert format_amount(1000000000000000000) == 1.0

def test_format_amount_non_int():
    assert format_amount("123.45") == "123.45"

