/* eslint-disable @typescript-eslint/no-unused-expressions */
import { kdf, verify } from '#pkg'

describe('Computing MCF scrypt hash and then verifying against several passwords', function () {
  const passwords = [
    'hello123',
    '1352&7saTgs',
    'thisisasuperlongpassword$%&/(@'
  ]
  const mcfs: string[] = []
  it('should create MFC scrypt hashes', async function () {
    for (let i = 0; i < passwords.length; i++) {
      mcfs[i] = await kdf(passwords[i])
      console.log(`${passwords[i]} => ${mcfs[i]}`)
      chai.expect(mcfs[i]).to.not.be.undefined
    }
  })
  it('verification should be successful if testing the right password', async function () {
    for (let i = 0; i < passwords.length; i++) {
      const verification = await verify(passwords[i], mcfs[i])
      chai.expect(verification).to.be.true
    }
  })
  it('verification should fail if testing the wrong password', async function () {
    for (let i = 0; i < passwords.length; i++) {
      const verification = await verify('wrongpassword', mcfs[i])
      chai.expect(verification).to.be.false
    }
  })
  it('verification should throw error if invalid mcf is provided', async function () {
    try {
      await verify('adsf', '$scrypt$asdf$asdsdffd$adasdasd')
    } catch (error) {
      chai.expect(true)
    }
  })
})
