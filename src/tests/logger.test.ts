import { describe, it } from 'node:test';
import { Logger, Verbosity } from '../index.js';
import { strict as assert } from 'node:assert';

describe('Test Logger', () => {
  describe('Test Logger', () => {
    it('should set the verbosity level correctly', () => {
      const logger = new Logger({ name: 'test', verbosity: Verbosity.INFO, logToFile: false });
      assert.equal(logger.getVerbosity(), Verbosity.INFO);

      logger.setVerbosity(Verbosity.DEBUG);
      assert.equal(logger.getVerbosity(), Verbosity.DEBUG);
    });

    it('should set the name correctly', () => {
      const logger = new Logger({ name: 'test', verbosity: Verbosity.INFO, logToFile: false });
      assert.equal(logger.getName(), 'test');

      logger.setName('newName');
      assert.equal(logger.getName(), 'newName');
    });

    it('should send the correct error message', () => {
      const logger = new Logger({ name: 'test', verbosity: Verbosity.INFO, logToFile: false });
      logger.error('This is an error message');
    });

    it('should send the correct fatal error message', () => {
      const logger = new Logger({ name: 'test', verbosity: Verbosity.FATAL_ERROR, logToFile: false });
      logger.fatal_error('This is an error message');
    });

    it('should send the correct warning message', () => {
      const logger = new Logger({ name: 'test', verbosity: Verbosity.INFO, logToFile: false });
      logger.warning('This is a warning message');
    });

    it('should send the correct info message', () => {
      const logger = new Logger({ name: 'test', verbosity: Verbosity.INFO, logToFile: false });
      logger.info('This is an info message');
    });

    it('should send the correct debug message', () => {
      const logger = new Logger({ name: 'test', verbosity: Verbosity.INFO, logToFile: false });

      logger.setVerbosity(Verbosity.DEBUG);
      logger.debug('This is a debug message');
    });

    it('should send the correct verbose message', () => {
      const logger = new Logger({ name: 'test', verbosity: Verbosity.INFO, logToFile: false });
      logger.verbose('This is a verbose message');

      logger.setVerbosity(Verbosity.VERBOSE);
      logger.verbose('This is a verbose message');
    });
  });
});