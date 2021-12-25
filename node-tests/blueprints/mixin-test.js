'use strict';

const blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
const setupTestHooks = blueprintHelpers.setupTestHooks;
const emberNew = blueprintHelpers.emberNew;
const emberGenerateDestroy = blueprintHelpers.emberGenerateDestroy;
const setupPodConfig = blueprintHelpers.setupPodConfig;
const EOL = require('os').EOL;

const chai = require('ember-cli-blueprint-test-helpers/chai');
const expect = chai.expect;

describe('Blueprint: mixin', function () {
  setupTestHooks(this);

  describe('in app', function () {
    beforeEach(function () {
      return emberNew();
    });

    it('mixin foo', function () {
      return emberGenerateDestroy(['mixin', 'foo'], (_file) => {
        expect(_file('app/mixins/foo.ts'))
          .to.contain("import Mixin from '@ember/object/mixin';")
          .to.contain(`export default Mixin.create({${EOL}});`);

        expect(_file('tests/unit/mixins/foo-test.ts')).to.contain(
          "import FooMixin from 'my-app/mixins/foo';"
        );
      });
    });

    it('mixin foo.ts', function () {
      return emberGenerateDestroy(['mixin', 'foo.ts'], (_file) => {
        expect(_file('app/mixins/foo.ts.ts')).to.not.exist;
        expect(_file('tests/unit/mixins/foo.ts-test.ts')).to.not.exist;

        expect(_file('app/mixins/foo.ts'))
          .to.contain("import Mixin from '@ember/object/mixin';")
          .to.contain(`export default Mixin.create({${EOL}});`);

        expect(_file('tests/unit/mixins/foo-test.ts')).to.contain(
          "import FooMixin from 'my-app/mixins/foo';"
        );
      });
    });

    it('mixin foo/bar', function () {
      return emberGenerateDestroy(['mixin', 'foo/bar'], (_file) => {
        expect(_file('app/mixins/foo/bar.ts'))
          .to.contain("import Mixin from '@ember/object/mixin';")
          .to.contain(`export default Mixin.create({${EOL}});`);

        expect(_file('tests/unit/mixins/foo/bar-test.ts')).to.contain(
          "import FooBarMixin from 'my-app/mixins/foo/bar';"
        );
      });
    });

    it('mixin foo/bar/baz', function () {
      return emberGenerateDestroy(['mixin', 'foo/bar/baz'], (_file) => {
        expect(_file('tests/unit/mixins/foo/bar/baz-test.ts')).to.contain(
          "import FooBarBazMixin from 'my-app/mixins/foo/bar/baz';"
        );
      });
    });

    it('mixin foo --pod', function () {
      return emberGenerateDestroy(['mixin', 'foo', '--pod'], (_file) => {
        expect(_file('app/mixins/foo.ts'))
          .to.contain("import Mixin from '@ember/object/mixin';")
          .to.contain(`export default Mixin.create({${EOL}});`);

        expect(_file('tests/unit/mixins/foo-test.ts')).to.contain(
          "import FooMixin from 'my-app/mixins/foo';"
        );
      });
    });

    it('mixin foo.ts --pod', function () {
      return emberGenerateDestroy(['mixin', 'foo.ts', '--pod'], (_file) => {
        expect(_file('app/mixins/foo.ts.ts')).to.not.exist;
        expect(_file('tests/unit/mixins/foo.ts-test.ts')).to.not.exist;

        expect(_file('app/mixins/foo.ts'))
          .to.contain("import Mixin from '@ember/object/mixin';")
          .to.contain(`export default Mixin.create({${EOL}});`);

        expect(_file('tests/unit/mixins/foo-test.ts')).to.contain(
          "import FooMixin from 'my-app/mixins/foo';"
        );
      });
    });

    it('mixin foo/bar --pod', function () {
      return emberGenerateDestroy(['mixin', 'foo/bar', '--pod'], (_file) => {
        expect(_file('app/mixins/foo/bar.ts'))
          .to.contain("import Mixin from '@ember/object/mixin';")
          .to.contain(`export default Mixin.create({${EOL}});`);

        expect(_file('tests/unit/mixins/foo/bar-test.ts')).to.contain(
          "import FooBarMixin from 'my-app/mixins/foo/bar';"
        );
      });
    });

    it('mixin foo/bar/baz --pod', function () {
      return emberGenerateDestroy(['mixin', 'foo/bar/baz', '--pod'], (_file) => {
        expect(_file('tests/unit/mixins/foo/bar/baz-test.ts')).to.contain(
          "import FooBarBazMixin from 'my-app/mixins/foo/bar/baz';"
        );
      });
    });

    describe('with podModulePrefix', function () {
      beforeEach(function () {
        setupPodConfig({ podModulePrefix: true });
      });

      it('mixin foo --pod', function () {
        return emberGenerateDestroy(['mixin', 'foo', '--pod'], (_file) => {
          expect(_file('app/mixins/foo.ts'))
            .to.contain("import Mixin from '@ember/object/mixin';")
            .to.contain(`export default Mixin.create({${EOL}});`);

          expect(_file('tests/unit/mixins/foo-test.ts')).to.contain(
            "import FooMixin from 'my-app/mixins/foo';"
          );
        });
      });

      it('mixin foo.ts --pod', function () {
        return emberGenerateDestroy(['mixin', 'foo.ts', '--pod'], (_file) => {
          expect(_file('app/mixins/foo.ts.ts')).to.not.exist;
          expect(_file('tests/unit/mixins/foo.ts-test.ts')).to.not.exist;

          expect(_file('app/mixins/foo.ts'))
            .to.contain("import Mixin from '@ember/object/mixin';")
            .to.contain(`export default Mixin.create({${EOL}});`);

          expect(_file('tests/unit/mixins/foo-test.ts')).to.contain(
            "import FooMixin from 'my-app/mixins/foo';"
          );
        });
      });

      it('mixin foo/bar --pod', function () {
        return emberGenerateDestroy(['mixin', 'foo/bar', '--pod'], (_file) => {
          expect(_file('app/mixins/foo/bar.ts'))
            .to.contain("import Mixin from '@ember/object/mixin';")
            .to.contain(`export default Mixin.create({${EOL}});`);

          expect(_file('tests/unit/mixins/foo/bar-test.ts')).to.contain(
            "import FooBarMixin from 'my-app/mixins/foo/bar';"
          );
        });
      });
    });
  });

  describe('in addon', function () {
    beforeEach(function () {
      return emberNew({ target: 'addon' });
    });

    it('mixin foo', function () {
      return emberGenerateDestroy(['mixin', 'foo'], (_file) => {
        expect(_file('addon/mixins/foo.ts'))
          .to.contain("import Mixin from '@ember/object/mixin';")
          .to.contain(`export default Mixin.create({${EOL}});`);

        expect(_file('tests/unit/mixins/foo-test.ts')).to.contain(
          "import FooMixin from 'my-addon/mixins/foo';"
        );

        expect(_file('app/mixins/foo.ts')).to.not.exist;
      });
    });

    it('mixin foo.ts', function () {
      return emberGenerateDestroy(['mixin', 'foo.ts'], (_file) => {
        expect(_file('addon/mixins/foo.ts.ts')).to.not.exist;
        expect(_file('tests/unit/mixins/foo.ts-test.ts')).to.not.exist;

        expect(_file('addon/mixins/foo.ts'))
          .to.contain("import Mixin from '@ember/object/mixin';")
          .to.contain(`export default Mixin.create({${EOL}});`);

        expect(_file('tests/unit/mixins/foo-test.ts')).to.contain(
          "import FooMixin from 'my-addon/mixins/foo';"
        );

        expect(_file('app/mixins/foo.ts')).to.not.exist;
      });
    });

    it('mixin foo/bar', function () {
      return emberGenerateDestroy(['mixin', 'foo/bar'], (_file) => {
        expect(_file('addon/mixins/foo/bar.ts'))
          .to.contain("import Mixin from '@ember/object/mixin';")
          .to.contain(`export default Mixin.create({${EOL}});`);

        expect(_file('tests/unit/mixins/foo/bar-test.ts')).to.contain(
          "import FooBarMixin from 'my-addon/mixins/foo/bar';"
        );

        expect(_file('app/mixins/foo/bar.ts')).to.not.exist;
      });
    });

    it('mixin foo/bar/baz', function () {
      return emberGenerateDestroy(['mixin', 'foo/bar/baz'], (_file) => {
        expect(_file('addon/mixins/foo/bar/baz.ts'))
          .to.contain("import Mixin from '@ember/object/mixin';")
          .to.contain(`export default Mixin.create({${EOL}});`);

        expect(_file('tests/unit/mixins/foo/bar/baz-test.ts')).to.contain(
          "import FooBarBazMixin from 'my-addon/mixins/foo/bar/baz';"
        );

        expect(_file('app/mixins/foo/bar/baz.ts')).to.not.exist;
      });
    });

    it('mixin foo/bar/baz --dummy', function () {
      return emberGenerateDestroy(['mixin', 'foo/bar/baz', '--dummy'], (_file) => {
        expect(_file('tests/dummy/app/mixins/foo/bar/baz.ts'))
          .to.contain("import Mixin from '@ember/object/mixin';")
          .to.contain(`export default Mixin.create({${EOL}});`);

        expect(_file('addon/mixins/foo/bar/baz.ts')).to.not.exist;
      });
    });

    it('mixin foo.ts --dummy', function () {
      return emberGenerateDestroy(['mixin', 'foo.ts', '--dummy'], (_file) => {
        expect(_file('tests/dummy/app/mixins/foo.ts.ts')).to.not.exist;

        expect(_file('tests/dummy/app/mixins/foo.ts'))
          .to.contain("import Mixin from '@ember/object/mixin';")
          .to.contain(`export default Mixin.create({${EOL}});`);

        expect(_file('addon/mixins/foo.ts')).to.not.exist;
      });
    });
  });

  describe('in in-repo-addon', function () {
    beforeEach(function () {
      return emberNew({ target: 'in-repo-addon' });
    });

    it('mixin foo --in-repo-addon=my-addon', function () {
      return emberGenerateDestroy(['mixin', 'foo', '--in-repo-addon=my-addon'], (_file) => {
        expect(_file('lib/my-addon/addon/mixins/foo.ts'))
          .to.contain("import Mixin from '@ember/object/mixin';")
          .to.contain(`export default Mixin.create({${EOL}});`);

        expect(_file('tests/unit/mixins/foo-test.ts')).to.contain(
          "import FooMixin from 'my-addon/mixins/foo';"
        );
      });
    });

    it('mixin foo.ts --in-repo-addon=my-addon', function () {
      return emberGenerateDestroy(['mixin', 'foo.ts', '--in-repo-addon=my-addon'], (_file) => {
        expect(_file('lib/my-addon/addon/mixins/foo.ts.ts')).to.not.exist;
        expect(_file('tests/unit/mixins/foo.ts-test.ts')).to.not.exist;

        expect(_file('lib/my-addon/addon/mixins/foo.ts'))
          .to.contain("import Mixin from '@ember/object/mixin';")
          .to.contain(`export default Mixin.create({${EOL}});`);

        expect(_file('tests/unit/mixins/foo-test.ts')).to.contain(
          "import FooMixin from 'my-addon/mixins/foo';"
        );
      });
    });

    it('mixin foo/bar --in-repo-addon=my-addon', function () {
      return emberGenerateDestroy(['mixin', 'foo/bar', '--in-repo-addon=my-addon'], (_file) => {
        expect(_file('lib/my-addon/addon/mixins/foo/bar.ts'))
          .to.contain("import Mixin from '@ember/object/mixin';")
          .to.contain(`export default Mixin.create({${EOL}});`);

        expect(_file('tests/unit/mixins/foo/bar-test.ts')).to.contain(
          "import FooBarMixin from 'my-addon/mixins/foo/bar';"
        );
      });
    });

    it('mixin foo/bar/baz --in-repo-addon=my-addon', function () {
      return emberGenerateDestroy(['mixin', 'foo/bar/baz', '--in-repo-addon=my-addon'], (_file) => {
        expect(_file('tests/unit/mixins/foo/bar/baz-test.ts')).to.contain(
          "import FooBarBazMixin from 'my-addon/mixins/foo/bar/baz';"
        );
      });
    });
  });
});
