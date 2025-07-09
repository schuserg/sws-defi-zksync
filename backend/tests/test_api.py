import unittest
from api import format_amount  # direct import after fixing PYTHONPATH

class TestFormatAmount(unittest.TestCase):
    def test_format_integer(self):
        self.assertEqual(format_amount(1_000_000_000_000_000_000), 1.0)

    def test_format_zero(self):
        self.assertEqual(format_amount(0), 0.0)

    def test_format_float_passthrough(self):
        self.assertEqual(format_amount(42.42), 42.42)

if __name__ == "__main__":
    unittest.main()

