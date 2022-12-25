# scrypt-mcf - v0.9.4

Scrypt using MCF for both browsers and Node.js

## Table of contents

### Interfaces

- [ScryptParams](interfaces/ScryptParams.md)

### Functions

- [kdf](API.md#kdf)
- [verify](API.md#verify)

## Functions

### kdf

▸ **kdf**(`password`, `saltBase64?`, `params?`, `derivedKeyLength?`): `Promise`<`string`\>

Computes a MFC string derived using scrypt on input password

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `password` | `string` | `undefined` | the password |
| `saltBase64?` | `string` | `undefined` | a scrypt salt (16 bytes) in base64 with no padding (22 characters) |
| `params?` | [`ScryptParams`](interfaces/ScryptParams.md) | `undefined` | scrypt params. If not provided, default values are assumed. { logN: 17, r: 8, p: 1 } |
| `derivedKeyLength` | `number` | `32` | the expected length of the output key. |

#### Returns

`Promise`<`string`\>

a MFC string with the format $scrypt$ln=<cost>,r=<blocksize>,p=<parallelism>$<salt in base64 no padding>$<hash in base64 no padding>

#### Defined in

index.ts:24

___

### verify

▸ **verify**(`password`, `mcf`): `Promise`<`boolean`\>

Verify if provided password meets the stored hash (in MCF)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `password` | `string` | the password to test |
| `mcf` | `string` | a MFC string with the format $scrypt$ln=<cost>,r=<blocksize>,p=<parallelism>$<salt in base64 no padding>$<hash in base64 no padding> |

#### Returns

`Promise`<`boolean`\>

#### Defined in

index.ts:48
