/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */

function todoListComponent(baseUrl) {
  return {
    taskDeleteModalIsActive: false,
    taskDeleteId: undefined,
    taskUpdateId: undefined,

    taskUrlBuild(operationType, id='') {
      return `${baseUrl}${operationType}/${id}${id ? '/' : ''}`;
    },
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
          return true;
        }
      }
    },
    taskUpdateDescription(id) {
      // let description =
      //   document.querySelector(`#task-update-description-${id}`).value;
      let description = eval(`this.$refs.taskUpdateDescription${id}`).value;
      if (!description) {
        // if description is empty, notify the user and return false
        hDispatch('status-message-display', {
          message: "Task description cannot be empty.",
          messageType: 'warning',
        });
        return false;
      } else {
        // document.body.dispatchEvent(
        //  new CustomEvent(`task-update-description-form-submit-${id}`));

        // if description is not empty, update the task
        let url = this.taskUrlBuild('update', id);
        htmx.ajax('PUT', url, {
          target: `#task-item-${id}`,
          values: { description }
        });
        this.taskUpdatePanelDisable();
        return true;
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
      let url = this.taskUrlBuild('delete', this.taskDeleteId);
      htmx.ajax('DELETE', url, { target: '#tasks' }); // delete task
      this.taskDeleteModalDisable(); // hide modal
    },
    taskDeleteModalHandleTabEvent(e) {
      let firstTabbable = this.$refs.taskDeleteModalFirstTabbable;
      let lastTabbable = this.$refs.taskDeleteModalLastTabbable;
      hHandleTabEvent(e, firstTabbable, lastTabbable);
    },
    taskDeleteModalEnable(id) {
      this.taskUpdatePanelDisable();
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
