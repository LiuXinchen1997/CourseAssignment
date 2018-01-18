const assert = require('assert');
const RouterLib = require('../router-lib');

describe('RouterLib', function() {
    describe('#getSubWebs', function() {
        it('normal test', async function() {
            const routerLib = new RouterLib();
            
            routerLib.options = {
                ifaddr: [
                    '192.87.45.190 masklen 24',
                    '192.87.46.190 masklen 22',
                    '192.87.46.190 masklen 32'
                ]
            };
        
            routerLib.router = {
                saveCalled: false,
                async save() {
                    this.saveCalled = true;
                }
            };
        
            await routerLib.getSubWebs();

            assert.deepStrictEqual(routerLib.options.subWebs, [
                '192.87.45.0', '192.87.44.0', '192.87.46.190'
            ]);
            assert.deepStrictEqual(routerLib.router.subWebs, '192.87.45.0;192.87.44.0;192.87.46.190');
            assert.equal(routerLib.router.saveCalled, true);
        });

        it('no ifaddr', async function() {
            const routerLib = new RouterLib();
            
            routerLib.options = {
                ifaddr: [
                ]
            };
        
            routerLib.router = {
                saveCalled: false,
                async save() {
                    this.saveCalled = true;
                }
            };
        
            await routerLib.getSubWebs();

            assert.deepStrictEqual(routerLib.options.subWebs, [
            ]);
            assert.deepStrictEqual(routerLib.router.subWebs, '');
            assert.equal(routerLib.router.saveCalled, true);
        });

        it('raise exception', async function() {
            const routerLib = new RouterLib();
            
            const oldConsoleLog = console.log;
            let consoleLogCalled = false;
            console.log = function() {
                consoleLogCalled = true;
            }
            routerLib.options = null;
        
            await routerLib.getSubWebs();

            console.log = oldConsoleLog;
            assert.equal(consoleLogCalled, true);
        });
    })
})