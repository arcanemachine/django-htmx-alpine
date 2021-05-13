from django import template

from project_folder.server_config import SERVER_TYPE

register = template.Library()


@register.simple_tag(takes_context=True)
def set_breakpoint(context):
    """
    Set breakpoints in the template for easy examination of the context.

    Usage:
        {% load breakpoint %}
        {% set_breakpoint %}
    """

    if SERVER_TYPE == 'dev':
        breakpoint()
