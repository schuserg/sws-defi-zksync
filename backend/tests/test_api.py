import unittest
import sys
import os
import pytest

# Add backend path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

# Skip tests in GitHub Actions
pytestmark = pytest.mark.skipif(
    os.environ.get("CI") == "true", reason="Skipping test in CI: no RPC or .env available"
)

from backend.utils import format_amount

class TestFormatAmount(unittest.TestCase):
    def test_format_integer(self):
        self.assertEqual(format_amount(1_000_000_000_000_000_000), 1.0)

    def test_format_zero(self):
        self.assertEqual(format_amount(0), 0.0)

    def test_format_float_passthrough(self):
        self.assertEqual(format_amount(42.42), 42.42)

if __name__ == "__main__":
    unittest.main()

