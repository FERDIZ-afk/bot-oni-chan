"use strict";
// Built around ShellTear's POC at #2215#issuecomment-1292885678 on @adiwajshing/baileys
// Copyright ~ purpshell
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollUpdateDecrypt = void 0;
var node_crypto_1 = require("node:crypto");
var enc = new TextEncoder();
/**
 * Decrypt PollUpdate messages
 */
var PollUpdateDecrypt = /** @class */ (function () {
    function PollUpdateDecrypt() {
    }
    /**
     * Compare the SHA-256 hashes of the poll options from the update to find the original choices
     * @param options Options from the poll creation message
     * @param pollOptionHash hash from `this.decrypt()`
     * @returns the original option, can be empty when none are currently selected
     */
    PollUpdateDecrypt.compare = function (options, pollOptionHashes) {
        return __awaiter(this, void 0, Promise, function () {
            var selectedOptions, _i, options_1, option, hash, _a, _b, _c, pollOptionHashes_1, pollOptionHash;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        selectedOptions = [];
                        _i = 0, options_1 = options;
                        _d.label = 1;
                    case 1:
                        if (!(_i < options_1.length)) return [3 /*break*/, 4];
                        option = options_1[_i];
                        _b = (_a = Buffer)
                            .from;
                        return [4 /*yield*/, node_crypto_1.default.webcrypto.subtle.digest('SHA-256', (new TextEncoder).encode(option))];
                    case 2:
                        hash = _b.apply(_a, [_d.sent()])
                            .toString('hex').toUpperCase();
                        for (_c = 0, pollOptionHashes_1 = pollOptionHashes; _c < pollOptionHashes_1.length; _c++) {
                            pollOptionHash = pollOptionHashes_1[_c];
                            if (pollOptionHash === hash) {
                                selectedOptions.push(option);
                            }
                        }
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        ;
                        return [2 /*return*/, selectedOptions];
                }
            });
        });
    };
    /**
     * decrypt a poll message update
     * @param encPayload from the update
     * @param encIv from the update
     * @param encKey from the original poll
     * @param pollMsgSender sender jid of the pollCreation message
     * @param pollMsgId id of the pollCreation message
     * @param voteMsgSender sender of the pollUpdate message
     * @returns The option or empty array if something went wrong OR everything was unticked
     */
    PollUpdateDecrypt.decrypt = function (encKey, encPayload, encIv, pollMsgSender, pollMsgId, voteMsgSender) {
        return __awaiter(this, void 0, Promise, function () {
            var stanzaId, parentMsgOriginalSender, modificationSender, modificationType, pad, signMe, createSignKey, sign, key, temp, decryptionKey, _a, additionalData, decryptedMessage, pollOptionHash;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        stanzaId = enc.encode(pollMsgId);
                        parentMsgOriginalSender = enc.encode(pollMsgSender);
                        modificationSender = enc.encode(voteMsgSender);
                        modificationType = enc.encode('Poll Vote');
                        pad = new Uint8Array([1]);
                        signMe = new Uint8Array(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], stanzaId, true), parentMsgOriginalSender, true), modificationSender, true), modificationType, true), [pad], false));
                        createSignKey = function (n) {
                            if (n === void 0) { n = new Uint8Array(32); }
                            return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, node_crypto_1.default.webcrypto.subtle.importKey('raw', n, { 'name': 'HMAC', 'hash': 'SHA-256' }, false, ['sign'])];
                                        case 1: return [2 /*return*/, (_a.sent())];
                                    }
                                });
                            });
                        };
                        sign = function (n, key) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, node_crypto_1.default.webcrypto.subtle.sign({ 'name': 'HMAC', 'hash': 'SHA-256' }, key, n)];
                                    case 1: return [2 /*return*/, (_a.sent())];
                                }
                            });
                        }); };
                        return [4 /*yield*/, createSignKey()];
                    case 1:
                        key = _b.sent();
                        return [4 /*yield*/, sign(encKey, key)];
                    case 2:
                        temp = _b.sent();
                        return [4 /*yield*/, createSignKey(new Uint8Array(temp))];
                    case 3:
                        key = _b.sent();
                        _a = Uint8Array.bind;
                        return [4 /*yield*/, sign(signMe, key)];
                    case 4:
                        decryptionKey = new (_a.apply(Uint8Array, [void 0, _b.sent()]))();
                        additionalData = enc.encode("".concat(pollMsgId, "\0").concat(voteMsgSender));
                        return [4 /*yield*/, this._decryptMessage(encPayload, encIv, additionalData, decryptionKey)];
                    case 5:
                        decryptedMessage = _b.sent();
                        pollOptionHash = this._decodeMessage(decryptedMessage);
                        // '0A20' in hex represents unicode " " and "\n" thus declaring the end of one option
                        // we want multiple hashes to make it easier to iterate and understand for your use cases
                        return [2 /*return*/, pollOptionHash.split('0A20') || []];
                }
            });
        });
    };
    /**
     * Internal method to decrypt the message after gathering all information
     * @deprecated Use `this.decrypt()` instead, only use this if you know what you are doing
     * @param encPayload
     * @param encIv
     * @param additionalData
     * @param decryptionKey
     * @returns
     */
    PollUpdateDecrypt._decryptMessage = function (encPayload, encIv, additionalData, decryptionKey) {
        return __awaiter(this, void 0, void 0, function () {
            var tagSize_multiplier, encoded, key, decrypted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tagSize_multiplier = 16;
                        encoded = encPayload;
                        return [4 /*yield*/, node_crypto_1.default.webcrypto.subtle.importKey('raw', decryptionKey, 'AES-GCM', false, ['encrypt', 'decrypt'])];
                    case 1:
                        key = _a.sent();
                        return [4 /*yield*/, node_crypto_1.default.webcrypto.subtle.decrypt({ name: 'AES-GCM', iv: encIv, additionalData: additionalData, tagLength: 8 * tagSize_multiplier }, key, encoded)];
                    case 2:
                        decrypted = _a.sent();
                        return [2 /*return*/, new Uint8Array(decrypted).slice(2)]; // remove 2 bytes (OA20)(space+newline)
                }
            });
        });
    };
    /**
     * Decode the message from `this._decryptMessage()`
     * @param decryptedMessage the message from `this._decrpytMessage()`
     * @returns
     */
    PollUpdateDecrypt._decodeMessage = function (decryptedMessage) {
        var n = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70];
        var outarr = [];
        for (var i = 0; i < decryptedMessage.length; i++) {
            var val = decryptedMessage[i];
            outarr.push(n[val >> 4], n[15 & val]);
        }
        return String.fromCharCode.apply(String, outarr);
    };
    return PollUpdateDecrypt;
}());
exports.PollUpdateDecrypt = PollUpdateDecrypt;
