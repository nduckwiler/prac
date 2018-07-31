local lu = require('luaunit')

TestSub = {}
  function TestSub: setUp()
    self.fname = 'trash.txt'
    os.remove(self.fname)
  end

  function TestSub: testSubOneArg()
    local str = 'hello'
    local substr = 'ello'
    lu.assertEquals(str:sub(2), substr)
  end

  function TestSub: testSubNegativeArg()
    local str = 'hello'
    local substr = 'lo'
    lu.assertEquals(str:sub(-2), substr)
  end

  function TestSub: testSubError()
    local str = 'hello'
    local msg = 'bad argument'
    lu.assertErrorMsgContains(msg, string.sub)
  end

  function TestSub: tearDown()
    os.remove(self.fname)
  end

-- end of table TestSub

os.exit( lu.LuaUnit.run() )
