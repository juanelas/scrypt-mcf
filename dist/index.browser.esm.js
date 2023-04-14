import{decode as r,encode as t}from"@juanelas/base64";import{salt as a,scrypt as n}from"scrypt-pbkdf";async function o(o,e){const s={logN:17,r:8,p:1,...e?.scryptParams},l={N:2**s.logN,r:s.r,p:s.p},d=void 0!==e?.saltBase64NoPadding?r(e.saltBase64NoPadding):a(),p=t(d,!1,!1),i=e?.derivedKeyLength??32,g=t(await n(o,d,i,l),!1,!1);return`$scrypt$ln=${s.logN},r=${s.r},p=${s.p}$${p}$${g}`}async function e(r,t){const a=[...t.matchAll(/^\$scrypt\$ln=(\d{1,2}),r=(\d{1,2}),p=(\d{1,2})\$([a-zA-Z0-9/+]{22})\$([a-zA-Z0-9/+]{22,})$/g)];if(1!==a.length)throw new Error("Invalid MCFstring format");const n=Number(a[0][1]),e=Number(a[0][2]),s=Number(a[0][3]),l=a[0][4],d=2**(Math.floor(Math.log2(6*a[0][5].length))-3);return await o(r,{saltBase64NoPadding:l,scryptParams:{logN:n,r:e,p:s},derivedKeyLength:d})===t}export{o as hash,e as verify};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnJvd3Nlci5lc20uanMiLCJzb3VyY2VzIjpbIi4uL3NyYy90cy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6bnVsbCwibmFtZXMiOlsiYXN5bmMiLCJoYXNoIiwicGFzc3dvcmQiLCJvcHRpb25zIiwic2NyeXB0UGFyYW1zIiwibG9nTiIsInIiLCJwIiwic2NyeXB0UGJrZGZQYXJhbXMiLCJOIiwiUyIsInVuZGVmaW5lZCIsInNhbHRCYXNlNjROb1BhZGRpbmciLCJiNjRkZWNvZGUiLCJnZXRSYW5kb21TYWx0IiwiU0Jhc2U2NCIsImI2NGVuY29kZSIsImRlcml2ZWRLZXlMZW5ndGgiLCJzY3J5cHQiLCJ2ZXJpZnkiLCJtY2YiLCJtYXRjaGVzIiwibWF0Y2hBbGwiLCJsZW5ndGgiLCJFcnJvciIsIk51bWJlciIsIk1hdGgiLCJmbG9vciIsImxvZzIiXSwibWFwcGluZ3MiOiJzR0EyQk9BLGVBQWVDLEVBQU1DLEVBQWtCQyxHQUM1QyxNQUFNQyxFQUF1QyxDQUMzQ0MsS0FBTSxHQUNOQyxFQUFHLEVBQ0hDLEVBQUcsS0FDQUosR0FBU0MsY0FFUkksRUFBdUMsQ0FDM0NDLEVBQUcsR0FBS0wsRUFBYUMsS0FDckJDLEVBQUdGLEVBQWFFLEVBQ2hCQyxFQUFHSCxFQUFhRyxHQUVaRyxPQUFzQ0MsSUFBakNSLEdBQVNTLG9CQUFxQ0MsRUFBVVYsRUFBUVMscUJBQXVCRSxJQUM1RkMsRUFBVUMsRUFBVU4sR0FBRyxHQUFPLEdBQzlCTyxFQUFtQmQsR0FBU2Msa0JBQW9CLEdBQ2hEaEIsRUFBT2UsUUFBZ0JFLEVBQU9oQixFQUFVUSxFQUFHTyxFQUFrQlQsSUFBb0IsR0FBTyxHQUM5RixNQUFPLGNBQWNKLEVBQWFDLFVBQVVELEVBQWFFLE9BQU9GLEVBQWFHLEtBQUtRLEtBQVdkLEdBQy9GLENBUU9ELGVBQWVtQixFQUFRakIsRUFBa0JrQixHQUM5QyxNQUVNQyxFQUFVLElBQUlELEVBQUlFLFNBRlYsaUdBSWQsR0FBdUIsSUFBbkJELEVBQVFFLE9BQ1YsTUFBTSxJQUFJQyxNQUFNLDRCQUdsQixNQUFNbkIsRUFBT29CLE9BQU9KLEVBQVEsR0FBRyxJQUN6QmYsRUFBSW1CLE9BQU9KLEVBQVEsR0FBRyxJQUN0QmQsRUFBSWtCLE9BQU9KLEVBQVEsR0FBRyxJQUN0QlgsRUFBSVcsRUFBUSxHQUFHLEdBQ2ZKLEVBQW1CLElBQU1TLEtBQUtDLE1BQU1ELEtBQUtFLEtBQTRCLEVBQXZCUCxFQUFRLEdBQUcsR0FBR0UsU0FBZSxHQVFqRixhQU4wQnRCLEVBQUtDLEVBQVUsQ0FDdkNVLG9CQUFxQkYsRUFDckJOLGFBQWMsQ0FBRUMsT0FBTUMsSUFBR0MsS0FDekJVLHVCQUdxQkcsQ0FDekIifQ==
