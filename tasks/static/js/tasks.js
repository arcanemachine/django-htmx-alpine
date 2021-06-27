/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */

function todoList(
    urlTaskCreate, urlTaskUpdateNoId, urlTaskDeleteNoId) {
  return {
    taskDeleteModalIsActive: false,
    taskDeleteId: undefined,
    taskUpdateId: undefined,

    taskCreate() {
      if (!this.$store.config.userIsAuthenticated) {
        // do not continue if user is not authenticated
        hDispatch(
          'status-message-display', {
            message: "You must login before you can add any tasks.",
            messageType: 'warning',
            eventName: 'login-modal-enable'
          });
        return false;
      } else {
        // get the value of the text input, then clear it
        let descriptionInput = this.$refs.taskCreateInputDescription;
        let description = descriptionInput.value;
        descriptionInput.value = '';

        htmx.ajax('POST', taskCreateUrl, {
          target: '#tasks',
          values: { description },
        });
      }
    },
    taskUpdateDescription(id) {
      let description = eval(`this.$refs.taskUpdateDescription${id}`).value;
      let url = urlTaskUpdateNoId + id + '/';
      htmx.ajax('PUT', url, {
        target: `#task-item-${id}`,
        values: { description }
      });

      this.taskUpdateId = undefined;
    },
    taskUpdateIsComplete(id, isComplete) {
      let url = urlTaskUpdateNoId + id + '/';
      htmx.ajax('PUT', url, {
        target: `#task-item-${id}`,
        values: { is_complete: !isComplete }
      });
    },
    taskUpdateToggle(id) {
      if (this.taskUpdateId !== id) {
        this.taskUpdateId = id;
        this.$nextTick(() => {
          eval(`this.$refs.taskUpdateDescription${id}`).select()
        });
      } else {
        this.taskUpdateId = undefined;
      }
    },
    taskDeleteModalHandleTabEvent(e) {
      hHandleTabEvent(e,
        this.$refs.taskDeleteModalFirstTabbable,
        this.$refs.taskDeleteModalLastTabbable
      );
    },
    taskDelete() {
      // delete the task
      let url = urlTaskDeleteNoId + this.taskDeleteId + '/';
      htmx.ajax('DELETE', url, { target: '#tasks' });

      // hide the modal
      this.taskDeleteModalDisable();
    },
    taskDeleteModalEnable(id) {
      this.taskUpdateToggle(undefined);
      this.taskDeleteModalIsActive = true;
      this.taskDeleteId = id;
      this.$nextTick(() => {
        this.$refs.taskDeleteModalFirstTabbable.focus();
      });
    },
    taskDeleteModalDisable() {
      this.taskDeleteModalIsActive = false;
      this.taskDeleteId = undefined;
    }
  }
}

try {
  module.exports = { todoList };
} catch {
  ; // eslint-disable-line
}
