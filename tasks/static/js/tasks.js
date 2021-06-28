/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */

function todoList(urlTaskCreate, urlTaskUpdateNoId, urlTaskDeleteNoId) {
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
          hDispatch('status-message-display', {
            message: "Task description cannot be empty.",
            messageType: 'warning',
          });
          return false;
        } else {
          document.body
            .dispatchEvent(new CustomEvent('task-create-form-submit'));
          descriptionInput.value = ''; // clear the description
        }
      }
    },
    taskUpdateDescription(id) {
      let description = eval(`this.$refs.taskUpdateDescription${id}`).value;
      if (!description) {
        hDispatch('status-message-display', {
          message: "Task description cannot be empty.",
          messageType: 'warning',
          eventName: 'login-modal-enable'
        });
      } else {
        document.body.dispatchEvent(
          new CustomEvent('task-update-description-form-submit'));
        this.taskUpdatePanelDisable();
      }
    },
    taskUpdatePanelDisable() {
      this.taskUpdateId = undefined;
    },
    taskUpdatePanelToggle(id) {
      if (this.taskUpdateId !== id) {
        this.taskUpdateId = id;
        this.$nextTick(() => {
          eval(`this.$refs.taskUpdateDescription${id}`).select()
        });
      } else {
        this.taskUpdatePanelDisable();
      }
    },
    taskDeleteModalHandleTabEvent(e) {
      let firstTabbable = this.$refs.taskDeleteModalFirstTabbable;
      let lastTabbable = this.$refs.taskDeleteModalLastTabbable;
      hHandleTabEvent(e, firstTabbable, lastTabbable);
    },
    taskDelete() {
      let url = urlTaskDeleteNoId + this.taskDeleteId + '/'; // get url
      htmx.ajax('DELETE', url, { target: '#tasks' }); // delete task
      this.taskDeleteModalDisable(); // hide modal
    },
    taskDeleteModalEnable(id) {
      this.taskUpdatePanelToggle(undefined);
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
  module.exports = todoList;
} catch {
  ; // eslint-disable-line
}
