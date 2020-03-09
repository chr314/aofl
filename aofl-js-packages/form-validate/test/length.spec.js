/* eslint no-invalid-this: "off", require-jsdoc: "off" */
import {maxLength, minLength} from '../modules/length';
import {expect} from 'chai';

describe('@aofl/aofl-validate/max-length', function() {
  before(function() {
    this.max = maxLength(3);
  });

  it('should be false when input length is greater than 3', function() {
    expect(this.max('1234')).to.be.false;
  });

  it('should be true when input length is equal to 3', function() {
    expect(this.max('123')).to.be.true;
  });

  it('should be true when input length is less than 3', function() {
    expect(this.max('12')).to.be.true;
  });

  it('should be true when value has length property and less than maxLength', function() {
    expect(this.max([])).to.be.true;
  });
  it('should be false when value has length property and greater than maxLength', function() {
    expect(this.max([1, 2, 3, 4])).to.be.false;
  });
});


describe('@aofl/aofl-validate/min-length', function() {
  before(function() {
    this.min = minLength(3);
  });

  it('should be true when input length is greater than 3', function() {
    expect(this.min('1234')).to.be.true;
  });

  it('should be true when input length is equal to 3', function() {
    expect(this.min('123')).to.be.true;
  });

  it('should be false when input length is less than 3', function() {
    expect(this.min('12')).to.be.false;
  });

  it('should be true when value has length property and greater than minLength', function() {
    expect(this.min([1, 2, 3, 4])).to.be.true;
  });
  it('should be false when value has length property and less than minLength', function() {
    expect(this.min([])).to.be.false;
  });
});
