from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in qubix_cnf/__init__.py
from qubix_cnf import __version__ as version

setup(
	name="qubix_cnf",
	version=version,
	description="custom development",
	author="Shivansh",
	author_email="shivansh.kashyap@qubixmedicare.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
