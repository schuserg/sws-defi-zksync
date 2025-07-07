import sys
import os
import unittest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from backend.listener import format_amount


class TestFormatAmount(unittest.TestCase):
    def test_format_amount_integer(self):
        self.assertEqual(format_amount(1000000000000000000), 1.0)

    def test_format_amount_zero(self):
        self.assertEqual(format_amount(0), 0.0)

    def test_format_amount_float_passthrough(self):
        self.assertEqual(format_amount(12.34), 12.34)


if __name__ == "__main__":
    unittest.main()

