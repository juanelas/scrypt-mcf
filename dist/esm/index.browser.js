import { decode, encode } from '@juanelas/base64';
import { salt, scrypt } from 'scrypt-pbkdf';

async function hash(password, options) {
    const scryptParams = {
        logN: 17,
        r: 8,
        p: 1,
        ...options?.scryptParams
    };
    const scryptPbkdfParams = {
        N: 2 ** scryptParams.logN,
        r: scryptParams.r,
        p: scryptParams.p
    };
    const S = (options?.saltBase64NoPadding !== undefined) ? decode(options.saltBase64NoPadding) : salt();
    const SBase64 = encode(S, false, false);
    const derivedKeyLength = options?.derivedKeyLength ?? 32;
    const hash = encode(await scrypt(password, S, derivedKeyLength, scryptPbkdfParams), false, false);
    return `$scrypt$ln=${scryptParams.logN},r=${scryptParams.r},p=${scryptParams.p}$${SBase64}$${hash}`;
}
async function verify(password, mcf) {
    const regex = /^\$scrypt\$ln=(\d{1,2}),r=(\d{1,2}),p=(\d{1,2})\$([a-zA-Z0-9/+]{22})\$([a-zA-Z0-9/+]{22,})$/g;
    const matches = [...mcf.matchAll(regex)];
    if (matches.length !== 1) {
        throw new Error('Invalid MCFstring format');
    }
    const logN = Number(matches[0][1]);
    const r = Number(matches[0][2]);
    const p = Number(matches[0][3]);
    const S = matches[0][4];
    const derivedKeyLength = 2 ** (Math.floor(Math.log2(matches[0][5].length * 6)) - 3);
    const passwordMfc = await hash(password, {
        saltBase64NoPadding: S,
        scryptParams: { logN, r, p },
        derivedKeyLength
    });
    return passwordMfc === mcf;
}

export { hash, verify };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnJvd3Nlci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3RzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpudWxsLCJuYW1lcyI6WyJiNjRkZWNvZGUiLCJnZXRSYW5kb21TYWx0IiwiYjY0ZW5jb2RlIl0sIm1hcHBpbmdzIjoiOzs7QUEyQk8sZUFBZSxJQUFJLENBQUUsUUFBZ0IsRUFBRSxPQUEwQixFQUFBO0FBQ3RFLElBQUEsTUFBTSxZQUFZLEdBQTJCO0FBQzNDLFFBQUEsSUFBSSxFQUFFLEVBQUU7QUFDUixRQUFBLENBQUMsRUFBRSxDQUFDO0FBQ0osUUFBQSxDQUFDLEVBQUUsQ0FBQztRQUNKLEdBQUcsT0FBTyxFQUFFLFlBQVk7S0FDekIsQ0FBQTtBQUNELElBQUEsTUFBTSxpQkFBaUIsR0FBc0I7QUFDM0MsUUFBQSxDQUFDLEVBQUUsQ0FBQyxJQUFJLFlBQVksQ0FBQyxJQUFJO1FBQ3pCLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNqQixDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7S0FDbEIsQ0FBQTtJQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLG1CQUFtQixLQUFLLFNBQVMsSUFBSUEsTUFBUyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHQyxJQUFhLEVBQUUsQ0FBQTtJQUNqSCxNQUFNLE9BQU8sR0FBR0MsTUFBUyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUE7QUFDMUMsSUFBQSxNQUFNLGdCQUFnQixHQUFHLE9BQU8sRUFBRSxnQkFBZ0IsSUFBSSxFQUFFLENBQUE7SUFDeEQsTUFBTSxJQUFJLEdBQUdBLE1BQVMsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFBO0FBQ3BHLElBQUEsT0FBTyxjQUFjLFlBQVksQ0FBQyxJQUFJLENBQUEsR0FBQSxFQUFNLFlBQVksQ0FBQyxDQUFDLENBQU0sR0FBQSxFQUFBLFlBQVksQ0FBQyxDQUFDLENBQUEsQ0FBQSxFQUFJLE9BQU8sQ0FBSSxDQUFBLEVBQUEsSUFBSSxFQUFFLENBQUE7QUFDckcsQ0FBQztBQVFNLGVBQWUsTUFBTSxDQUFFLFFBQWdCLEVBQUUsR0FBVyxFQUFBO0lBQ3pELE1BQU0sS0FBSyxHQUFHLDhGQUE4RixDQUFBO0lBRTVHLE1BQU0sT0FBTyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7QUFFeEMsSUFBQSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQ3hCLFFBQUEsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFBO0FBQzVDLEtBQUE7QUFFRCxJQUFBLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNsQyxJQUFBLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUMvQixJQUFBLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUMvQixNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDdkIsSUFBQSxNQUFNLGdCQUFnQixHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBRW5GLElBQUEsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxFQUFFO0FBQ3ZDLFFBQUEsbUJBQW1CLEVBQUUsQ0FBQztBQUN0QixRQUFBLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1FBQzVCLGdCQUFnQjtBQUNqQixLQUFBLENBQUMsQ0FBQTtJQUVGLE9BQU8sV0FBVyxLQUFLLEdBQUcsQ0FBQTtBQUM1Qjs7OzsifQ==
