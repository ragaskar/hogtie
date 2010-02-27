describe('hogtie', function () {
  var checkbox, select, changeSpy;

  beforeEach(function() {
    var html = '<input type="checkbox" id="checkbox_field" name="checkbox_field"/>' +
               '<label for="checkbox_field">Checkbox</label>' +
               '<select id="select_field" name="select_field">' +
               '<option value="locked" selected="selected">Locked</option>' +
               '<option value="unlocked">Unlocked</option>' +
               '</select>' +
               '<label for="select_field">Select Field</label>';
    var fixture = $('#jasmine_content').append($(html));
    checkbox = fixture.find('#checkbox_field');
    select = fixture.find('#select_field');
    changeSpy = jasmine.createSpy("changeSpy");
  });

  afterEach(function() {
    $('#jasmine_content').empty();
  });

  describe("simple conditions", function() {

    describe("on init", function () {
      it("should disable the constained field if the condition field matches its string value", function() {
        $(checkbox).hogtie({
          "#select_field" : "locked"
        }, changeSpy);

        expect($(checkbox).attr("disabled")).toBe(true)
        expect(changeSpy).wasCalledWith(true);
      });

      it("should not disable the constrained field if the condition field does not match its string value", function() {
        $(select).val("unlocked");
        $(checkbox).hogtie({
          "#select_field" : "locked"
        }, changeSpy);
        expect($(checkbox).attr("disabled")).toBe(false)
        expect(changeSpy).wasCalledWith(false);
      });
    });

    describe("on change", function () {
      it("should disable the constained field if the condition field matches its string value", function() {
        $(select).val("unlocked");

        $(checkbox).hogtie({
          "#select_field" : "locked"
        }, changeSpy);

        expect($(checkbox).attr("disabled")).toBe(false);
        expect(changeSpy).wasCalledWith(false);

        changeSpy.reset();

        $(select).val("locked");
        $(select).trigger('change');

        expect($(checkbox).attr("disabled")).toBe(true);
        expect(changeSpy).wasCalledWith(true);
      });

      it("should enable the constrained field if the condition field does not match its string value", function() {
        $(checkbox).hogtie({
          "#select_field" : "locked"
        }, changeSpy);
        expect($(checkbox).attr("disabled")).toBe(true);
        expect(changeSpy).wasCalledWith(true);

        changeSpy.reset();

        $(select).val("unlocked");
        $(select).trigger('change');


        expect($(checkbox).attr("disabled")).toBe(false);
        expect(changeSpy).wasCalledWith(false);
      });
    });


  });

  describe("whenChanged", function() {
    it("should be an optional attribute", function() {
      $(checkbox).hogtie({
        "#select_field" : "locked"
      });
      expect(changeSpy).wasNotCalled();
    });
  });


});