# django-htmx-alpine 
A sandbox for using Django with HTMX.

## Setup Instructions

- Use [Poetry](https://python-poetry.org/docs/) to create a virtualenv and install the required dependencies
  - `poetry install`
- Activate the virtualenv
  - `poetry shell`
- In the `project_folder/` folder, make local copies of `server_config.py` and `keys.py`.
  - `cd project_folder; cp server_config.default.py server_config.py; cp keys.default.py keys.py`.
- In `keys.py`, create a new `SECRET_KEY` using the instructions contained in `keys.py`.
- Run `manage.py migrate` to generate a database.

### Optional Steps
- Most relevant settings are contained in `project_folder/server_config.py`. The options in `settings.py` shouldn't need to be modified.
- In `keys.py`, you can add an API key from OpenWeatherMap if you want the weather demo in the 'About' modal to work
- From the `scripts/` folder, copy the postactivate and predeactivate files to your virtualenv's `bin/` directory.
  - e.g. `cp scripts/postactivate scripts/predeactivate ${VIRTUAL_ENV}/bin/`
