/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */

function todoListComponent(urlTaskDeleteNoId) {
  return {
    taskDeleteModalIsActive: false,
    taskDeleteId: undefined,
    taskUpdateId: undefined,

    taskCreate() {
      if (!this.$store.config.userIsAuthenticated) {
        // do not continue if user is not authenticated
        hDispatch('status-message-display', {
            message: "You must login before you can add any tasks.",
            messageType: 'warning',
            eventName: 'login-modal-enable'
          });
        return false;
      } else {
        // get the description
        let descriptionInput = this.$refs.taskCreateInputDescription;
        let description = descriptionInput.value;
        if (!description) {
          // if description is empty, show error as status message
          hDispatch('status-message-display', {
            message: "Task description cannot be empty.",
            messageType: 'warning',
          });
          return false;
        } else {
          // if description, dispatch task create event
          document.body
            .dispatchEvent(new CustomEvent('task-create-form-submit'));
          descriptionInput.value = ''; // clear the description
        }
      }
    },
    taskUpdateDescription(id) {
      let description = eval(`this.$refs.taskUpdateDescription${id}`).value;
      if (!description) {
        // if description is empty, show error as status message
        const errorMessage = "Task description cannot be empty.";
        hDispatch('status-message-display', {
          message: errorMessage,
          messageType: 'warning',
          eventName: 'login-modal-enable'
        });
        console.error(errorMessage);
        return false;
      } else {
        //// if description, update the task
        // document.body.dispatchEvent(
        //  new CustomEvent(`task-update-description-form-submit-${id}`));
        let url = `http://192.168.1.120:8000/tasks/update/${id}/`
        htmx.ajax('PUT', url, {
          target: `#task-item-${id}`,
          values: { description }
        });
        this.taskUpdatePanelDisable();
      }
    },
    taskUpdatePanelDisable() {
      this.taskUpdateId = undefined;
    },
    taskUpdatePanelToggle(id) {
      if (this.taskUpdateId !== id) {
        this.taskUpdateId = id;
      } else {
        this.taskUpdatePanelDisable();
      }
    },
    taskDelete() {
      let url = urlTaskDeleteNoId + this.taskDeleteId + '/'; // get url
      htmx.ajax('DELETE', url, { target: '#tasks' }); // delete task
      this.taskDeleteModalDisable(); // hide modal
    },
    taskDeleteModalHandleTabEvent(e) {
      let firstTabbable = this.$refs.taskDeleteModalFirstTabbable;
      let lastTabbable = this.$refs.taskDeleteModalLastTabbable;
      hHandleTabEvent(e, firstTabbable, lastTabbable);
    },
    taskDeleteModalEnable(id) {
      this.taskUpdatePanelToggle(undefined);
      this.taskDeleteModalIsActive = true;
      this.taskDeleteId = id;
    },
    taskDeleteModalDisable() {
      this.taskDeleteModalIsActive = false;
      this.taskDeleteId = undefined;
    }
  }
}

try {
  module.exports = todoListComponent;
} catch {
  ; // eslint-disable-line
}
