/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */

function todoListComponent(baseUrl) {
  return {
    taskDeleteModalIsActive: false,
    taskDeleteId: undefined,
    taskUpdateId: undefined,

    taskUrlBuild(baseUrl, operationType, id='') {
      return `${baseUrl}${operationType}${id ? '/' + id + '/' : '/'}`;
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
      let description =
        document.querySelector(`#task-update-description-${id}`).value;

      if (!description) {
        // if description is empty, notify the user and return false
        hDispatch('status-message-display', {
          message: "Task description cannot be empty.",
          messageType: 'warning',
        });
        return false;
      } else {
        document.body.dispatchEvent(
          new CustomEvent(`task-update-description-form-submit-${id}`));
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
        this.$nextTick(() => {
          let descriptionInput =
            document.querySelector(`#task-update-description-${id}`);
          descriptionInput.select();
        });
      } else {
        this.taskUpdatePanelDisable();
      }
    },
    taskDelete() {
      document.body.dispatchEvent(new CustomEvent('task-delete'));
      this.taskDeleteModalDisable(); // hide the task delete modal
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
