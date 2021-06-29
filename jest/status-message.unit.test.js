/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */

const statusMessageComponent = require('./@/static/js/status-message.js');
const helpers = require('./@/static/js/helpers.js');

describe('statusMessageComponent()', () => {
  let instance;
  let result;

  beforeEach(() => {
    instance = statusMessageComponent();
    result = undefined;
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
      result = instance.getColors(20);

      expect(result.background).toEqual(instance.infoBackground);
      expect(result.text).toEqual('white');
    });

    test('messageType "info" returns info message', () => {
      result = instance.getColors('info');

      expect(result.background).toEqual(instance.infoBackground);
      expect(result.text).toEqual('white');
    });

    test('messageType 25 returns success message', () => {
      result = instance.getColors(25);

      expect(result.background).toEqual(instance.successBackground);
      expect(result.text).toEqual('white');
    });

    test('messageType "success" returns success message', () => {
      result = instance.getColors('success');

      expect(result.background).toEqual(instance.successBackground);
      expect(result.text).toEqual('white');
    });

    test('messageType 30 returns warning message', () => {
      result = instance.getColors(30);

      expect(result.background).toEqual(instance.warningBackground);
      expect(result.text).toEqual('black');
    });

    test('messageType "warning" returns warning message', () => {
      result = instance.getColors('warning');

      expect(result.background).toEqual(instance.warningBackground);
      expect(result.text).toEqual('black');
    });

    test('messageType 30 returns danger message', () => {
      result = instance.getColors(40);

      expect(result.background).toEqual(instance.dangerBackground);
      expect(result.text).toEqual('white');
    });

    test('messageType "danger" returns danger message', () => {
      result = instance.getColors('danger');

      expect(result.background).toEqual(instance.dangerBackground);
      expect(result.text).toEqual('white');
    });

    test('any other messageType returns info message', () => {
      result = instance.getColors(undefined); // undefined

      expect(result.background).toEqual(instance.infoBackground);
      expect(result.text).toEqual('white');

      result = instance.getColors(1); // other number

      expect(result.background).toEqual(instance.infoBackground);
      expect(result.text).toEqual('white');

      result = instance.getColors('test'); // other string

      expect(result.background).toEqual(instance.infoBackground);
      expect(result.text).toEqual('white');
    });
  });

  describe('handleStatusMessageClick()', () => {
    it('Dispatches the expected event when eventName is truthy', () => {
      // mock data
      instance.eventName = 'test-event';

      // mock functions
      hDispatch = jest.fn();
      instance.$nextTick = jest.fn(() => { hDispatch(instance.eventName, instance.eventParams); });
      instance.statusMessageClear = jest.fn();

      instance.handleStatusMessageClick();

      expect(instance.$nextTick).toHaveBeenCalled();
      expect(instance.$nextTick).toHaveBeenCalledWith(
        () => { hDispatch(instance.eventName, instance.eventParams); }
      );

      expect(hDispatch).toHaveBeenCalled();
      expect(hDispatch).toHaveBeenCalledTimes(1);
 
    });
   

    // expect(instance.$nextTick).toHaveBeenCalled();
    // expect(hDispatch).toHaveBeenCalled();
  });

});
