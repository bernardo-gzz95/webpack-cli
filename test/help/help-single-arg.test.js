'use strict';

const { yellow, options } = require('colorette');
const { run, isWebpack5 } = require('../utils/test-utils');
const helpHeader = 'The build tool for modern web applications';

describe('single help flag', () => {
    it('respects --no-color flag', () => {
        const { stdout, stderr, exitCode } = run(__dirname, ['--help', '--no-color'], false);
        const usage = 'webpack [...options] | <command>';
        const example = 'webpack help --flag | <command>';
        options.enabled = true;

        expect(exitCode).toBe(0);
        expect(stdout).not.toContain(yellow(usage));
        expect(stdout).not.toContain(yellow(example));
        expect(stdout).toContain(usage);
        expect(stdout).toContain(example);
        expect(stderr).toHaveLength(0);
    });

    it('outputs basic help info with command syntax', () => {
        const { stdout, stderr, exitCode } = run(__dirname, ['help'], false);

        expect(exitCode).toBe(0);
        expect(stdout).toContain(helpHeader);
        expect(stdout).toContain('-t, --target');
        if (isWebpack5) {
            expect(stdout).not.toContain('--output-library-amd');
        }
        expect(stderr).toHaveLength(0);
    });

    it('outputs basic help info with dashed syntax', () => {
        const { stdout, stderr, exitCode } = run(__dirname, ['--help'], false);

        expect(exitCode).toBe(0);
        expect(stdout).toContain(helpHeader);
        expect(stdout).toContain('-t, --target');
        if (isWebpack5) {
            expect(stdout).not.toContain('--output-library-amd');
        }
        expect(stderr).toHaveLength(0);
    });

    it('outputs advanced help info with dashed syntax', () => {
        const { stdout, stderr, exitCode } = run(__dirname, ['--help', 'advance'], false);

        expect(exitCode).toBe(0);
        expect(stdout).toContain(helpHeader);
        if (isWebpack5) {
            expect(stdout).toContain('--output-library-amd');
        }
        expect(stderr).toHaveLength(0);
    });

    it('outputs advanced help info with command syntax', () => {
        const { stdout, stderr, exitCode } = run(__dirname, ['help', 'advance'], false);

        expect(exitCode).toBe(0);
        expect(stdout).toContain(helpHeader);
        if (isWebpack5) {
            expect(stdout).toContain('--output-library-amd');
        }
        expect(stderr).toHaveLength(0);
    });

    it('outputs advanced help info with --help=advance', () => {
        const { stdout, stderr, exitCode } = run(__dirname, ['--help=advance'], false);

        expect(exitCode).toBe(0);
        expect(stdout).toContain(helpHeader);
        if (isWebpack5) {
            expect(stdout).toContain('--output-library-amd');
        }
        expect(stderr).toHaveLength(0);
    });
});
