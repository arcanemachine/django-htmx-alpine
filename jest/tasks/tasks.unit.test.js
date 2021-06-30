/* eslint no-undef: 0 */

// const htmx = require('./@/static/js/htmx@1.4.1.min.js');
const todoListComponent = require('./@/tasks/static/js/tasks.js');

/*
jest.mock('./@/static/js/htmx.min.js');
jest.mock('htmx', () => ({
  'ajax': jest.fn()
}), { virtual: true });
*/

describe('todoListComponent()', () => {
  beforeEach(() => {
    htmx = {};
    htmx.ajax = jest.fn();
    hHandleTabEvent = jest.fn();
    instance = todoListComponent();
    instance.$refs = {};
    expected = undefined;
    result = undefined;
  });

  it('Creates an instance of todoListComponent()', () => {
    expect(instance).toBeTruthy();
  });

  test('Variables contain expected values', () => {
    expect(instance.taskDeleteModalIsActive).toEqual(false);
    expect(instance.taskDeleteId).toEqual(undefined);
    expect(instance.taskUpdateId).toEqual(undefined);
  });

  describe('taskCreate()', () => {
    beforeEach(() => {
      hDispatch = jest.fn();
      instance.$refs.taskCreateInputDescription = {};
      instance.$store = {};
      instance.$store.config = {};
    });

    it('Creates a task if user logged in and description is not empty', () => {
      instance.$store.config.userIsAuthenticated = true;
      instance.$refs.taskCreateInputDescription.value = 'description';

      let result = instance.taskCreate();

      expect(result).toEqual(true);
    });

    it('Dispatches expected event when user creates a task', () => {

      instance.$store.config.userIsAuthenticated = true;
      instance.$refs.taskCreateInputDescription.value = 'description';
      document.body.dispatchEvent = jest.fn();

      instance.taskCreate();

      expect(document.body.dispatchEvent).toHaveBeenCalled();
      expect(document.body.dispatchEvent).toHaveBeenCalledWith(
        new CustomEvent('task-create-form-submit')
      );
    });

    it('Clears the description input after user creates a task', () => {
      instance.$store.config.userIsAuthenticated = true;
      instance.$refs.taskCreateInputDescription.value = 'description';
      let descriptionInput = instance.$refs.taskCreateInputDescription;

      instance.taskCreate();

      expect(descriptionInput.value).toEqual('');
    });

    it('Cannot create a task if user is not logged in', () => {
      instance.$store.config.userIsAuthenticated = false;

      expect(instance.taskCreate()).toEqual(false);
    });

    it('Dispatches right event if unauth user attempts to create task', () => {
      instance.$store.config.userIsAuthenticated = false;

      instance.taskCreate();

      expect(hDispatch).toHaveBeenCalled();
      expect(hDispatch).toHaveBeenCalledWith('status-message-display', {
        message: "You must login before you can add any tasks.",
        messageType: 'warning',
        eventName: 'login-modal-enable'
      });
    });

    it('Cannot create a task if the description is empty', () => {
      instance.$store.config.userIsAuthenticated = true;
      instance.$refs.taskCreateInputDescription.value = '';

      let result = instance.taskCreate();

      expect(result).toEqual(false);
    });

    it('Dispatches expected event if description is empty', () => {
      instance.$store.config.userIsAuthenticated = true;
      instance.$refs.taskCreateInputDescription.value = '';

      instance.taskCreate();

      expect(hDispatch).toHaveBeenCalled();
      expect(hDispatch).toHaveBeenCalledWith('status-message-display', {
        message: "Task description cannot be empty.",
        messageType: 'warning',
      });
    });
  });

  describe('taskUpdateDescription()', () => {
    const id = 2;

    beforeEach(() => {
      instance.$refs.taskUpdateDescription2 = {};
    });

    it('Updates the description if the description is not empty', () => {
      instance.$refs.taskUpdateDescription2.value = 'description';

      expect(instance.taskUpdateDescription(id)).toEqual(true)
    });

    it('Calls taskUpdatePanelDisable() after updating the description', () => {
      instance.$refs.taskUpdateDescription2.value = 'description';
      instance.taskUpdatePanelDisable = jest.fn();

      instance.taskUpdateDescription(id)

      expect(instance.taskUpdatePanelDisable).toHaveBeenCalled();
    });

    it('Returns false if description is empty', () => {
      instance.$refs.taskUpdateDescription2.value = '';

      expect(instance.taskUpdateDescription(id)).toEqual(false);
    });

    it('Dispatches expected event if description is empty', () => {
      instance.$refs.taskUpdateDescription2.value = '';

      instance.taskUpdateDescription(id);

      expect(hDispatch).toHaveBeenCalled();
      expect(hDispatch).toHaveBeenCalledWith('status-message-display', {
        message: "Task description cannot be empty.",
        messageType: 'warning',
      });
    });

  });

  describe('taskUpdatePanelDisable()', () => {
    it('Sets taskUpdateId to undefined', () => {
      instance.taskUpdateId = true;

      instance.taskUpdatePanelDisable();

      expect(instance.taskUpdateId).toEqual(undefined);
    });
  });

  describe('taskUpdatePanelToggle()', () => {
    const id = 2;

    it('Sets taskUpdateId to id if taskUpdateId === undefined', () => {
      expect(instance.taskUpdateId).toEqual(undefined);

      instance.taskUpdatePanelToggle(id);

      expect(instance.taskUpdateId).toEqual(id);
    });

    it('Sets taskUpdateId to undefined if taskUpdateId === id', () => {
      instance.taskUpdateId = id;

      instance.taskUpdatePanelToggle(id);

      expect(instance.taskUpdateId).toEqual(undefined);
    });
  });

  describe('taskDelete()', () => {

    // TODO: it('Calls the expected HTMX function', () => {});

    it('Calls taskDeleteModalDisable()', () => {
      instance.taskDeleteModalDisable = jest.fn();

      instance.taskDelete();

      expect(instance.taskDeleteModalDisable).toHaveBeenCalled();
    });
  });

  describe('taskDeleteModalHandleTabEvent()', () => {
    it('Calls hHandleTabEvent with the expected parameters', () => {
      const e = 'a';
      instance.$refs.taskDeleteModalFirstTabbable = 'b';
      instance.$refs.taskDeleteModalLastTabbable = 'c';

      instance.taskDeleteModalHandleTabEvent(e);

      expect(hHandleTabEvent).toHaveBeenCalled();
      expect(hHandleTabEvent).toHaveBeenCalledWith(
        e,
        instance.$refs.taskDeleteModalFirstTabbable,
        instance.$refs.taskDeleteModalLastTabbable
      );
    });

  });

  describe('taskDeleteModalEnable()', () => {
    it('Calls taskUpdatePanelDisable()', () => {
      instance.taskUpdatePanelDisable = jest.fn();

      instance.taskDeleteModalEnable();

      expect(instance.taskUpdatePanelDisable).toHaveBeenCalled();
    });

    it('Sets taskDeleteModalIsActive to true', () => {
      instance.taskDeleteModalIsActive = false;

      instance.taskDeleteModalEnable();

      expect(instance.taskDeleteModalIsActive).toEqual(true);
    });

    it('Sets current taskDeleteId to given value', () => {
      const id = 2;

      instance.taskDeleteModalEnable(id);

      expect(instance.taskDeleteId).toEqual(id);
    });
  });

  describe('taskDeleteModalDisable()', () => {
    it('Sets taskDeleteModalIsActive to false', () => {
      instance.taskDeleteModalIsActive = true;

      instance.taskDeleteModalDisable();

      expect(instance.taskDeleteModalIsActive).toEqual(false);
    });

    it('Sets current taskDeleteId to undefined', () => {
      instance.taskDeleteId = 2;

      instance.taskDeleteModalDisable();

      expect(instance.taskDeleteId).toEqual(undefined);
    });
  });

});
