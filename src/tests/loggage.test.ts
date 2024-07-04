import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { Loggage, Verbosity } from '../index.js';

describe('Test Loggage', () => {
  it('should set the verbosity level correctly', () => {
    const loggage = new Loggage({ name: 'My Project', verbosity: Verbosity.INFO, save: false });
    assert.equal(loggage.getVerbosity(), Verbosity.INFO);

    loggage.setVerbosity(Verbosity.DEBUG);
    assert.equal(loggage.getVerbosity(), Verbosity.DEBUG);
  });

  it('should set the name correctly', () => {
    const loggage = new Loggage({ name: 'My Project', verbosity: Verbosity.INFO, save: false });
    assert.equal(loggage.getName(), 'My Project');

    loggage.setName('newName');
    assert.equal(loggage.getName(), 'newName');
  });

  it('should set the log to file correctly', () => {
    const loggage = new Loggage({ name: 'My Project', verbosity: Verbosity.INFO, save: false });
    assert.equal(loggage.getSaveToFile(), false);

    loggage.setSaveToFile(true);
    assert.equal(loggage.getSaveToFile(), true);
  });

  it('should send the correct error message', () => {
    const loggage = new Loggage({ name: 'My Project', verbosity: Verbosity.INFO, save: false });

    loggage.error('This is an error message');
  });

  it('should send the correct fatal error message', () => {
    const loggage = new Loggage({ name: 'My Project', verbosity: Verbosity.FATAL_ERROR, save: false });

    loggage.fatal_error('This is an error message');
  });

  it('should send the correct warning message', () => {
    const loggage = new Loggage({ name: 'My Project', verbosity: Verbosity.INFO, save: false });

    loggage.warning('This is a warning message');
  });

  it('should send the correct info message', () => {
    const loggage = new Loggage({ name: 'My Project', verbosity: Verbosity.INFO, save: false });

    loggage.info('This is an info message');
  });

  it('should send the correct debug message', () => {
    const loggage = new Loggage({ name: 'My Project', verbosity: Verbosity.DEBUG, save: false });

    loggage.debug('This is a debug message');
  });

  it('should send the correct verbose message', () => {
    const loggage = new Loggage({ name: 'My Project', verbosity: Verbosity.VERBOSE, save: false });

    loggage.verbose('This is a verbose message');
  });
});
