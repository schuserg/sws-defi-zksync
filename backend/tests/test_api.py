import unittest
import sys
import os

# Add backend/ directory to sys.path to allow direct import of api.py
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from api import format_amount


class TestFormatAmount(unittest.TestCase):
    def test_format_integer(self):
        # Test conversion of large integer (1e18) to float 1.0
        self.assertEqual(format_amount(1_000_000_000_000_000_000), 1.0)

    def test_format_zero(self):
        # Test conversion of zero
        self.assertEqual(format_amount(0), 0.0)

    def test_format_float_passthrough(self):
        # Test passthrough of float values
        self.assertEqual(format_amount(42.42), 42.42)


if __name__ == "__main__":
    unittest.main()

