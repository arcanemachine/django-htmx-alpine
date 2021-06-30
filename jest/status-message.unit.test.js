/* eslint no-undef: 0 */

const statusMessageComponent = require('./@/static/js/status-message.js');
// const helpers = require('./@/static/js/helpers.js');

describe('statusMessageComponent()', () => {
  let instance;
  let expected;

  beforeEach(() => {
    instance = statusMessageComponent();
    expected = undefined;
  });

  // sanity check
  it('Creates an instance of statusMessageComponent()', () => {
    expect(instance).toBeTruthy();
  });

  test('Variables contain expected values', () => {
    expect(instance.show).toEqual(false);
    expect(instance.colors).toEqual({});
    expect(instance.eventName).toEqual(undefined);
    expect(instance.eventParams).toEqual({});
    expect(instance.statusMessageText).toEqual('');
    expect(instance.statusMessageTimeout).toEqual(undefined);

    expect(instance.infoBackground).toEqual('#3E8ED0');
    expect(instance.successBackground).toEqual('#48C78E');
    expect(instance.warningBackground).toEqual('#FFE08A');
    expect(instance.dangerBackground).toEqual('#F14668');
  });

  describe('getColors()', () => {
    test('messageType 20 returns info message', () => {
      expected = instance.getColors(20);

      expect(expected.background).toEqual(instance.infoBackground);
      expect(expected.text).toEqual('white');
    });

    test('messageType "info" returns info message', () => {
      expected = instance.getColors('info');

      expect(expected.background).toEqual(instance.infoBackground);
      expect(expected.text).toEqual('white');
    });

    test('messageType 25 returns success message', () => {
      expected = instance.getColors(25);

      expect(expected.background).toEqual(instance.successBackground);
      expect(expected.text).toEqual('white');
    });

    test('messageType "success" returns success message', () => {
      expected = instance.getColors('success');

      expect(expected.background).toEqual(instance.successBackground);
      expect(expected.text).toEqual('white');
    });

    test('messageType 30 returns warning message', () => {
      expected = instance.getColors(30);

      expect(expected.background).toEqual(instance.warningBackground);
      expect(expected.text).toEqual('black');
    });

    test('messageType "warning" returns warning message', () => {
      expected = instance.getColors('warning');

      expect(expected.background).toEqual(instance.warningBackground);
      expect(expected.text).toEqual('black');
    });

    test('messageType 30 returns danger message', () => {
      expected = instance.getColors(40);

      expect(expected.background).toEqual(instance.dangerBackground);
      expect(expected.text).toEqual('white');
    });

    test('messageType "danger" returns danger message', () => {
      expected = instance.getColors('danger');

      expect(expected.background).toEqual(instance.dangerBackground);
      expect(expected.text).toEqual('white');
    });

    test('any other messageType returns info message', () => {
      expected = instance.getColors(undefined); // undefined

      expect(expected.background).toEqual(instance.infoBackground);
      expect(expected.text).toEqual('white');

      expected = instance.getColors(1); // other number

      expect(expected.background).toEqual(instance.infoBackground);
      expect(expected.text).toEqual('white');

      expected = instance.getColors('test'); // other string

      expect(expected.background).toEqual(instance.infoBackground);
      expect(expected.text).toEqual('white');
    });
  });

  describe('processContext()', () => {
    let context;

    beforeEach(() => {
      context = undefined;
      defaultMessageTimeout = 500;

      console.error = jest.fn();
    }); 

    afterEach(() => {
      console.error.mockClear();
    });

    it('Returns false if context is not object or string', () => {
      context = 5;
      expect(instance.processContext(context)).toEqual(false);
    });

    it('Returns false if context is object with no message property', () => {
      context = { test: 'test' };
      expect(instance.processContext(context)).toEqual(false);
    });

    it('Returns expected context for valid parameters', () => {
      context = {
        message: 'message',
        messageType: 'message type',
        timeout: 100,
      };
      
      expected = {
        message: context.message,
        messageType: context.messageType,
        timeout: context.timeout,
      }

      expect(instance.processContext(context)).toEqual(expected);
    });

    it('Returns default timeout if no timeout value given', () => {
      context = {
        message: 'message',
      };
      
      expected = {
        message: context.message,
        messageType: undefined,
        timeout: defaultMessageTimeout
      }

      expect(instance.processContext(context)).toEqual(expected);
    });

    it('assigns proper event data if context contains eventName', () => {
      context = {
        message: 'message',
        eventName: 'event',
        eventParams: { property: 'value' }
      };
      
      expected = {
        eventName: context.eventName,
        eventParams: context.eventParams,
      }

      instance.processContext(context);

      expect(instance.eventName).toEqual(expected.eventName);
      expect(instance.eventParams).toEqual(expected.eventParams);
    });

    it('assigns proper event data if context contains no eventName', () => {
      context = {
        message: 'message',
      };
      
      expected = {
        eventName: undefined,
        eventParams: {},
      }

      instance.processContext(context);

      expect(instance.eventName).toEqual(expected.eventName);
      expect(instance.eventParams).toEqual(expected.eventParams);
    });

  });

  describe('statusMessageDisplay()', () => {
    // TODO
    // it('Shows a message', () => {});
    // it('Hides a message after the default timeout if no timeout given', () => {});
    // it('Hides a message after the given timeout if timeout given', () => {});
    // it('Clears the existing message before showing a new message', () => {});
    // it('Applies the proper color and background', () => {});
    // it('Removes the color and background after the timeout', () => {});
  });

  describe('handleStatusMessageClick()', () => {
    let hDispatch;

    beforeEach(() => {
      hDispatch = jest.fn();
      instance.$nextTick = jest.fn();
      instance.statusMessageClear = jest.fn();
    });

    afterEach(() => {
      hDispatch.mockClear();
      instance.$nextTick.mockClear();
      instance.statusMessageClear.mockClear();
    });

    it('Does not dispatch an event when eventName is falsy', () => {
      instance.handleStatusMessageClick();

      expect(instance.$nextTick).toHaveBeenCalledTimes(0);
    });

    it('Dispatches the expected event when eventName is truthy', () => {
      // mock data
      instance.eventName = 'test-event';

      // mock functions
      instance.$nextTick = jest.fn(
        () => hDispatch(instance.eventName, instance.eventParams)
      );

      instance.handleStatusMessageClick();

      expect(instance.$nextTick).toHaveBeenCalled();
      expect(hDispatch).toHaveBeenCalled();
      expect(hDispatch)
        .toHaveBeenCalledWith(instance.eventName, instance.eventParams);
 
    });

    it('Calls statusMessageClear()', () => {
      instance.statusMessageClear = jest.fn();

      instance.handleStatusMessageClick();

      expect(instance.statusMessageClear).toHaveBeenCalled();
    });

  });
});
