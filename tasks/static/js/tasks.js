/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */

function todoList(urlTaskCreate, urlTaskUpdateNoId, urlTaskDeleteNoId) {
  return {
    taskDeleteModalIsActive: false,
    taskDeleteId: undefined,
    taskUpdateId: undefined,

    taskCreate() {
      console.log('taskCreate()');
      if (!userIsAuthenticated) {
        // do not continue if user is not authenticated
        hDispatch(
          'status-message-display', 
          {
            message: "You must login before you can add any tasks.",
            messageType: 'warning'
          });
      } else {
        // get the value of the text input, then clear it
        let descriptionInput = document
          .querySelector("#task-create-input-description");
        let description = descriptionInput.value;
        descriptionInput.value = '';

        htmx.ajax('POST', taskCreateUrl, {
          target: '#tasks',
          values: { description },
        });
      }
    },
    taskUpdateDescription(id) {
      console.log('taskUpdateDescription()');
      let description = document
        .querySelector(`#task-update-description-${id}`).value
      let url = urlTaskUpdateNoId + id + '/';
      htmx.ajax('PUT', url, {
        target: `#task-item-${id}`,
        values: { description }
      });

      this.taskUpdateId = undefined;
    },
    taskUpdateIsComplete(id, isComplete) {
      console.log('taskUpdateIsComplete()');
      let url = urlTaskUpdateNoId + id + '/';
      htmx.ajax('PUT', url, {
        target: `#task-item-${id}`,
        values: { is_complete: !isComplete }
      });
    },
    taskUpdateToggle(id) {
      console.log('taskUpdateToggle()');
      if (this.taskUpdateId !== id) {
        this.taskUpdateId = id;
      } else {
        this.taskUpdateId = undefined;
      }
    },
    taskDeleteModalHandleTabEvent(e) {
      console.log('taskDeleteModalHandleTabEvent()');
      hHandleTabEvent(e,
        document.querySelector('#task-delete-modal-first-tabbable'),
        document.querySelector('#task-delete-modal-last-tabbable')
      );
    },
    taskDelete() {
      console.log('taskDeleteHandler()');
      // delete the task
      let url = urlTaskDeleteNoId + this.taskDeleteId + '/';
      htmx.ajax('DELETE', url, { target: '#tasks' });

      // hide the modal
      this.taskDeleteModalDisable();
    },
    taskDeleteModalEnable(id) {
      console.log('taskDeleteModalEnable()');
      this.taskUpdateToggle(undefined);
      this.taskDeleteModalIsActive = true;
      this.taskDeleteId = id;
      this.$nextTick(() => {
        document.querySelector('#task-delete-modal-first-tabbable').focus();
      });
    },
    taskDeleteModalDisable() {
      console.log('taskDeleteModalDisable()');
      this.taskDeleteModalIsActive = false;
      this.taskDeleteId = undefined;
    },
  }
}
