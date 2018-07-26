include('liblogging');
include('libstorage');

var LIBMACHO = true;
// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['kaitai-struct/KaitaiStream'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('kaitai-struct/KaitaiStream'));
    } else {
        root.MachO = factory(root.KaitaiStream);
    }
}(this, function(KaitaiStream) {
    var MachO = (function() {
        MachO.MagicType = Object.freeze({
            FAT_LE: 3199925962,
            FAT_BE: 3405691582,
            MACHO_LE_X86: 3472551422,
            MACHO_LE_X64: 3489328638,
            MACHO_BE_X86: 4277009102,
            MACHO_BE_X64: 4277009103,
            3199925962: "FAT_LE",
            3405691582: "FAT_BE",
            3472551422: "MACHO_LE_X86",
            3489328638: "MACHO_LE_X64",
            4277009102: "MACHO_BE_X86",
            4277009103: "MACHO_BE_X64",
        });
        MachO.CpuType = Object.freeze({
            VAX: 1,
            ROMP: 2,
            NS32032: 4,
            NS32332: 5,
            I386: 7,
            MIPS: 8,
            NS32532: 9,
            HPPA: 11,
            ARM: 12,
            MC88000: 13,
            SPARC: 14,
            I860: 15,
            I860_LITTLE: 16,
            RS6000: 17,
            POWERPC: 18,
            ABI64: 16777216,
            X86_64: 16777223,
            ARM64: 16777228,
            POWERPC64: 16777234,
            ANY: 4294967295,
            1: "VAX",
            2: "ROMP",
            4: "NS32032",
            5: "NS32332",
            7: "I386",
            8: "MIPS",
            9: "NS32532",
            11: "HPPA",
            12: "ARM",
            13: "MC88000",
            14: "SPARC",
            15: "I860",
            16: "I860_LITTLE",
            17: "RS6000",
            18: "POWERPC",
            16777216: "ABI64",
            16777223: "X86_64",
            16777228: "ARM64",
            16777234: "POWERPC64",
            4294967295: "ANY",
        });
        MachO.FileType = Object.freeze({
            OBJECT: 1,
            EXECUTE: 2,
            FVMLIB: 3,
            CORE: 4,
            PRELOAD: 5,
            DYLIB: 6,
            DYLINKER: 7,
            BUNDLE: 8,
            DYLIB_STUB: 9,
            DSYM: 10,
            KEXT_BUNDLE: 11,
            1: "OBJECT",
            2: "EXECUTE",
            3: "FVMLIB",
            4: "CORE",
            5: "PRELOAD",
            6: "DYLIB",
            7: "DYLINKER",
            8: "BUNDLE",
            9: "DYLIB_STUB",
            10: "DSYM",
            11: "KEXT_BUNDLE",
        });
        MachO.LoadCommandType = Object.freeze({
            SEGMENT: 1,
            SYMTAB: 2,
            SYMSEG: 3,
            THREAD: 4,
            UNIX_THREAD: 5,
            LOAD_FVM_LIB: 6,
            ID_FVM_LIB: 7,
            IDENT: 8,
            FVM_FILE: 9,
            PREPAGE: 10,
            DYSYMTAB: 11,
            LOAD_DYLIB: 12,
            ID_DYLIB: 13,
            LOAD_DYLINKER: 14,
            ID_DYLINKER: 15,
            PREBOUND_DYLIB: 16,
            ROUTINES: 17,
            SUB_FRAMEWORK: 18,
            SUB_UMBRELLA: 19,
            SUB_CLIENT: 20,
            SUB_LIBRARY: 21,
            TWOLEVEL_HINTS: 22,
            PREBIND_CKSUM: 23,
            SEGMENT_64: 25,
            ROUTINES_64: 26,
            UUID: 27,
            CODE_SIGNATURE: 29,
            SEGMENT_SPLIT_INFO: 30,
            LAZY_LOAD_DYLIB: 32,
            ENCRYPTION_INFO: 33,
            DYLD_INFO: 34,
            VERSION_MIN_MACOSX: 36,
            VERSION_MIN_IPHONEOS: 37,
            FUNCTION_STARTS: 38,
            DYLD_ENVIRONMENT: 39,
            DATA_IN_CODE: 41,
            SOURCE_VERSION: 42,
            DYLIB_CODE_SIGN_DRS: 43,
            ENCRYPTION_INFO_64: 44,
            LINKER_OPTION: 45,
            LINKER_OPTIMIZATION_HINT: 46,
            VERSION_MIN_TVOS: 47,
            VERSION_MIN_WATCHOS: 48,
            REQ_DYLD: 2147483648,
            LOAD_WEAK_DYLIB: 2147483672,
            RPATH: 2147483676,
            REEXPORT_DYLIB: 2147483679,
            DYLD_INFO_ONLY: 2147483682,
            LOAD_UPWARD_DYLIB: 2147483683,
            MAIN: 2147483688,
            1: "SEGMENT",
            2: "SYMTAB",
            3: "SYMSEG",
            4: "THREAD",
            5: "UNIX_THREAD",
            6: "LOAD_FVM_LIB",
            7: "ID_FVM_LIB",
            8: "IDENT",
            9: "FVM_FILE",
            10: "PREPAGE",
            11: "DYSYMTAB",
            12: "LOAD_DYLIB",
            13: "ID_DYLIB",
            14: "LOAD_DYLINKER",
            15: "ID_DYLINKER",
            16: "PREBOUND_DYLIB",
            17: "ROUTINES",
            18: "SUB_FRAMEWORK",
            19: "SUB_UMBRELLA",
            20: "SUB_CLIENT",
            21: "SUB_LIBRARY",
            22: "TWOLEVEL_HINTS",
            23: "PREBIND_CKSUM",
            25: "SEGMENT_64",
            26: "ROUTINES_64",
            27: "UUID",
            29: "CODE_SIGNATURE",
            30: "SEGMENT_SPLIT_INFO",
            32: "LAZY_LOAD_DYLIB",
            33: "ENCRYPTION_INFO",
            34: "DYLD_INFO",
            36: "VERSION_MIN_MACOSX",
            37: "VERSION_MIN_IPHONEOS",
            38: "FUNCTION_STARTS",
            39: "DYLD_ENVIRONMENT",
            41: "DATA_IN_CODE",
            42: "SOURCE_VERSION",
            43: "DYLIB_CODE_SIGN_DRS",
            44: "ENCRYPTION_INFO_64",
            45: "LINKER_OPTION",
            46: "LINKER_OPTIMIZATION_HINT",
            47: "VERSION_MIN_TVOS",
            48: "VERSION_MIN_WATCHOS",
            2147483648: "REQ_DYLD",
            2147483672: "LOAD_WEAK_DYLIB",
            2147483676: "RPATH",
            2147483679: "REEXPORT_DYLIB",
            2147483682: "DYLD_INFO_ONLY",
            2147483683: "LOAD_UPWARD_DYLIB",
            2147483688: "MAIN",
        });
        function MachO(_io, _parent, _root) {
            this._io = _io;
            this._parent = _parent;
            this._root = _root || this;
            this._read();
        }
        MachO.prototype._read = function() {
            this.magic = this._io.readU4be();
            this.header = new MachHeader(this._io, this, this._root);
            this.loadCommands = new Array(this.header.ncmds);
            for (var i = 0; i < this.header.ncmds; i++) {
                this.loadCommands[i] = new LoadCommand(this._io, this, this._root);
            }
        }
        var RpathCommand = MachO.RpathCommand = (function() {
            function RpathCommand(_io, _parent, _root) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this._read();
            }
            RpathCommand.prototype._read = function() {
                this.pathOffset = this._io.readU4le();
                this.path = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "utf-8");
            }
            return RpathCommand;
        })();
        var Uleb128 = MachO.Uleb128 = (function() {
            function Uleb128(_io, _parent, _root) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this._read();
            }
            Uleb128.prototype._read = function() {
                this.b1 = this._io.readU1();
                if ((this.b1 & 128) != 0) {
                    this.b2 = this._io.readU1();
                }
                if ((this.b2 & 128) != 0) {
                    this.b3 = this._io.readU1();
                }
                if ((this.b3 & 128) != 0) {
                    this.b4 = this._io.readU1();
                }
                if ((this.b4 & 128) != 0) {
                    this.b5 = this._io.readU1();
                }
                if ((this.b5 & 128) != 0) {
                    this.b6 = this._io.readU1();
                }
                if ((this.b6 & 128) != 0) {
                    this.b7 = this._io.readU1();
                }
                if ((this.b7 & 128) != 0) {
                    this.b8 = this._io.readU1();
                }
                if ((this.b8 & 128) != 0) {
                    this.b9 = this._io.readU1();
                }
                if ((this.b9 & 128) != 0) {
                    this.b10 = this._io.readU1();
                }
            }
            Object.defineProperty(Uleb128.prototype, 'value', {
                get: function() {
                    if (this._m_value !== undefined)
                        return this._m_value;
                    this._m_value = ((KaitaiStream.mod(this.b1, 128) << 0) + ((this.b1 & 128) == 0 ? 0 : ((KaitaiStream.mod(this.b2, 128) << 7) + ((this.b2 & 128) == 0 ? 0 : ((KaitaiStream.mod(this.b3, 128) << 14) + ((this.b3 & 128) == 0 ? 0 : ((KaitaiStream.mod(this.b4, 128) << 21) + ((this.b4 & 128) == 0 ? 0 : ((KaitaiStream.mod(this.b5, 128) << 28) + ((this.b5 & 128) == 0 ? 0 : ((KaitaiStream.mod(this.b6, 128) << 35) + ((this.b6 & 128) == 0 ? 0 : ((KaitaiStream.mod(this.b7, 128) << 42) + ((this.b7 & 128) == 0 ? 0 : ((KaitaiStream.mod(this.b8, 128) << 49) + ((this.b8 & 128) == 0 ? 0 : ((KaitaiStream.mod(this.b9, 128) << 56) + ((this.b8 & 128) == 0 ? 0 : (KaitaiStream.mod(this.b10, 128) << 63)))))))))))))))))));
                    return this._m_value;
                }
            });
            return Uleb128;
        })();
        var SourceVersionCommand = MachO.SourceVersionCommand = (function() {
            function SourceVersionCommand(_io, _parent, _root) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this._read();
            }
            SourceVersionCommand.prototype._read = function() {
                this.version = this._io.readU8le();
            }
            return SourceVersionCommand;
        })();
        var CsBlob = MachO.CsBlob = (function() {
            CsBlob.CsMagic = Object.freeze({
                BLOB_WRAPPER: 4208855809,
                REQUIREMENT: 4208856064,
                REQUIREMENTS: 4208856065,
                CODE_DIRECTORY: 4208856066,
                EMBEDDED_SIGNATURE: 4208856256,
                DETACHED_SIGNATURE: 4208856257,
                ENTITLEMENT: 4208882033,
                4208855809: "BLOB_WRAPPER",
                4208856064: "REQUIREMENT",
                4208856065: "REQUIREMENTS",
                4208856066: "CODE_DIRECTORY",
                4208856256: "EMBEDDED_SIGNATURE",
                4208856257: "DETACHED_SIGNATURE",
                4208882033: "ENTITLEMENT",
            });
            function CsBlob(_io, _parent, _root) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this._read();
            }
            CsBlob.prototype._read = function() {
                this.magic = this._io.readU4be();
                this.length = this._io.readU4be();
                switch (this.magic) {
                    case MachO.CsBlob.CsMagic.DETACHED_SIGNATURE:
                        this._raw_body = this._io.readBytes((this.length - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new SuperBlob(_io__raw_body, this, this._root);
                        break;
                    case MachO.CsBlob.CsMagic.EMBEDDED_SIGNATURE:
                        this._raw_body = this._io.readBytes((this.length - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new SuperBlob(_io__raw_body, this, this._root);
                        break;
                    case MachO.CsBlob.CsMagic.ENTITLEMENT:
                        this._raw_body = this._io.readBytes((this.length - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new Entitlement(_io__raw_body, this, this._root);
                        break;
                    case MachO.CsBlob.CsMagic.BLOB_WRAPPER:
                        this._raw_body = this._io.readBytes((this.length - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new BlobWrapper(_io__raw_body, this, this._root);
                        break;
                    case MachO.CsBlob.CsMagic.REQUIREMENT:
                        this._raw_body = this._io.readBytes((this.length - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new Requirement(_io__raw_body, this, this._root);
                        break;
                    case MachO.CsBlob.CsMagic.CODE_DIRECTORY:
                        this._raw_body = this._io.readBytes((this.length - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new CodeDirectory(_io__raw_body, this, this._root);
                        break;
                    case MachO.CsBlob.CsMagic.REQUIREMENTS:
                        this._raw_body = this._io.readBytes((this.length - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new Entitlements(_io__raw_body, this, this._root);
                        break;
                    default:
                        this.body = this._io.readBytes((this.length - 8));
                        break;
                }
            }
            var Entitlement = CsBlob.Entitlement = (function() {
                function Entitlement(_io, _parent, _root) {
                    this._io = _io;
                    this._parent = _parent;
                    this._root = _root || this;
                    this._read();
                }
                Entitlement.prototype._read = function() {
                    this.data = this._io.readBytesFull();
                }
                return Entitlement;
            })();
            var CodeDirectory = CsBlob.CodeDirectory = (function() {
                function CodeDirectory(_io, _parent, _root) {
                    this._io = _io;
                    this._parent = _parent;
                    this._root = _root || this;
                    this._read();
                }
                CodeDirectory.prototype._read = function() {
                    this.version = this._io.readU4be();
                    this.flags = this._io.readU4be();
                    this.hashOffset = this._io.readU4be();
                    this.identOffset = this._io.readU4be();
                    this.nSpecialSlots = this._io.readU4be();
                    this.nCodeSlots = this._io.readU4be();
                    this.codeLimit = this._io.readU4be();
                    this.hashSize = this._io.readU1();
                    this.hashType = this._io.readU1();
                    this.spare1 = this._io.readU1();
                    this.pageSize = this._io.readU1();
                    this.spare2 = this._io.readU4be();
                    if (this.version >= 131328) {
                        this.scatterOffset = this._io.readU4be();
                    }
                    if (this.version >= 131584) {
                        this.teamIdOffset = this._io.readU4be();
                    }
                }
                Object.defineProperty(CodeDirectory.prototype, 'ident', {
                    get: function() {
                        if (this._m_ident !== undefined)
                            return this._m_ident;
                        var _pos = this._io.pos;
                        this._io.seek((this.identOffset - 8));
                        this._m_ident = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "utf-8");
                        this._io.seek(_pos);
                        return this._m_ident;
                    }
                });
                Object.defineProperty(CodeDirectory.prototype, 'teamId', {
                    get: function() {
                        if (this._m_teamId !== undefined)
                            return this._m_teamId;
                        var _pos = this._io.pos;
                        this._io.seek((this.teamIdOffset - 8));
                        this._m_teamId = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "utf-8");
                        this._io.seek(_pos);
                        return this._m_teamId;
                    }
                });
                Object.defineProperty(CodeDirectory.prototype, 'hashes', {
                    get: function() {
                        if (this._m_hashes !== undefined)
                            return this._m_hashes;
                        var _pos = this._io.pos;
                        this._io.seek(((this.hashOffset - 8) - (this.hashSize * this.nSpecialSlots)));
                        this._m_hashes = new Array((this.nSpecialSlots + this.nCodeSlots));
                        for (var i = 0; i < (this.nSpecialSlots + this.nCodeSlots); i++) {
                            this._m_hashes[i] = this._io.readBytes(this.hashSize);
                        }
                        this._io.seek(_pos);
                        return this._m_hashes;
                    }
                });
                return CodeDirectory;
            })();
            var EntitlementsBlobIndex = CsBlob.EntitlementsBlobIndex = (function() {
                EntitlementsBlobIndex.RequirementType = Object.freeze({
                    HOST: 1,
                    GUEST: 2,
                    DESIGNATED: 3,
                    LIBRARY: 4,
                    1: "HOST",
                    2: "GUEST",
                    3: "DESIGNATED",
                    4: "LIBRARY",
                });
                function EntitlementsBlobIndex(_io, _parent, _root) {
                    this._io = _io;
                    this._parent = _parent;
                    this._root = _root || this;
                    this._read();
                }
                EntitlementsBlobIndex.prototype._read = function() {
                    this.type = this._io.readU4be();
                    this.offset = this._io.readU4be();
                }
                Object.defineProperty(EntitlementsBlobIndex.prototype, 'value', {
                    get: function() {
                        if (this._m_value !== undefined)
                            return this._m_value;
                        var _pos = this._io.pos;
                        this._io.seek((this.offset - 8));
                        this._m_value = new CsBlob(this._io, this, this._root);
                        this._io.seek(_pos);
                        return this._m_value;
                    }
                });
                return EntitlementsBlobIndex;
            })();
            var Data = CsBlob.Data = (function() {
                function Data(_io, _parent, _root) {
                    this._io = _io;
                    this._parent = _parent;
                    this._root = _root || this;
                    this._read();
                }
                Data.prototype._read = function() {
                    this.length = this._io.readU4be();
                    this.value = this._io.readBytes(this.length);
                    this.padding = this._io.readBytes((4 - (this.length & 3)));
                }
                return Data;
            })();
            var SuperBlob = CsBlob.SuperBlob = (function() {
                function SuperBlob(_io, _parent, _root) {
                    this._io = _io;
                    this._parent = _parent;
                    this._root = _root || this;
                    this._read();
                }
                SuperBlob.prototype._read = function() {
                    this.count = this._io.readU4be();
                    this.blobs = new Array(this.count);
                    for (var i = 0; i < this.count; i++) {
                        this.blobs[i] = new BlobIndex(this._io, this, this._root);
                    }
                }
                return SuperBlob;
            })();
            var Expr = CsBlob.Expr = (function() {
                Expr.OpEnum = Object.freeze({
                    FALSE: 0,
                    TRUE: 1,
                    IDENT: 2,
                    APPLE_ANCHOR: 3,
                    ANCHOR_HASH: 4,
                    INFO_KEY_VALUE: 5,
                    AND_OP: 6,
                    OR_OP: 7,
                    CD_HASH: 8,
                    NOT_OP: 9,
                    INFO_KEY_FIELD: 10,
                    CERT_FIELD: 11,
                    TRUSTED_CERT: 12,
                    TRUSTED_CERTS: 13,
                    CERT_GENERIC: 14,
                    APPLE_GENERIC_ANCHOR: 15,
                    ENTITLEMENT_FIELD: 16,
                    0: "FALSE",
                    1: "TRUE",
                    2: "IDENT",
                    3: "APPLE_ANCHOR",
                    4: "ANCHOR_HASH",
                    5: "INFO_KEY_VALUE",
                    6: "AND_OP",
                    7: "OR_OP",
                    8: "CD_HASH",
                    9: "NOT_OP",
                    10: "INFO_KEY_FIELD",
                    11: "CERT_FIELD",
                    12: "TRUSTED_CERT",
                    13: "TRUSTED_CERTS",
                    14: "CERT_GENERIC",
                    15: "APPLE_GENERIC_ANCHOR",
                    16: "ENTITLEMENT_FIELD",
                });
                Expr.CertSlot = Object.freeze({
                    LEFT_CERT: 0,
                    ANCHOR_CERT: 4294967295,
                    0: "LEFT_CERT",
                    4294967295: "ANCHOR_CERT",
                });
                function Expr(_io, _parent, _root) {
                    this._io = _io;
                    this._parent = _parent;
                    this._root = _root || this;
                    this._read();
                }
                Expr.prototype._read = function() {
                    this.op = this._io.readU4be();
                    switch (this.op) {
                        case MachO.CsBlob.Expr.OpEnum.CERT_GENERIC:
                            this.data = new CertGenericExpr(this._io, this, this._root);
                            break;
                        case MachO.CsBlob.Expr.OpEnum.APPLE_GENERIC_ANCHOR:
                            this.data = new AppleGenericAnchorExpr(this._io, this, this._root);
                            break;
                        case MachO.CsBlob.Expr.OpEnum.INFO_KEY_FIELD:
                            this.data = new InfoKeyFieldExpr(this._io, this, this._root);
                            break;
                        case MachO.CsBlob.Expr.OpEnum.AND_OP:
                            this.data = new AndExpr(this._io, this, this._root);
                            break;
                        case MachO.CsBlob.Expr.OpEnum.ANCHOR_HASH:
                            this.data = new AnchorHashExpr(this._io, this, this._root);
                            break;
                        case MachO.CsBlob.Expr.OpEnum.INFO_KEY_VALUE:
                            this.data = new Data(this._io, this, this._root);
                            break;
                        case MachO.CsBlob.Expr.OpEnum.OR_OP:
                            this.data = new OrExpr(this._io, this, this._root);
                            break;
                        case MachO.CsBlob.Expr.OpEnum.TRUSTED_CERT:
                            this.data = new CertSlotExpr(this._io, this, this._root);
                            break;
                        case MachO.CsBlob.Expr.OpEnum.NOT_OP:
                            this.data = new Expr(this._io, this, this._root);
                            break;
                        case MachO.CsBlob.Expr.OpEnum.IDENT:
                            this.data = new IdentExpr(this._io, this, this._root);
                            break;
                        case MachO.CsBlob.Expr.OpEnum.CERT_FIELD:
                            this.data = new CertFieldExpr(this._io, this, this._root);
                            break;
                        case MachO.CsBlob.Expr.OpEnum.ENTITLEMENT_FIELD:
                            this.data = new EntitlementFieldExpr(this._io, this, this._root);
                            break;
                        case MachO.CsBlob.Expr.OpEnum.CD_HASH:
                            this.data = new Data(this._io, this, this._root);
                            break;
                    }
                }
                var InfoKeyFieldExpr = Expr.InfoKeyFieldExpr = (function() {
                    function InfoKeyFieldExpr(_io, _parent, _root) {
                        this._io = _io;
                        this._parent = _parent;
                        this._root = _root || this;
                        this._read();
                    }
                    InfoKeyFieldExpr.prototype._read = function() {
                        this.data = new Data(this._io, this, this._root);
                        this.match = new Match(this._io, this, this._root);
                    }
                    return InfoKeyFieldExpr;
                })();
                var CertSlotExpr = Expr.CertSlotExpr = (function() {
                    function CertSlotExpr(_io, _parent, _root) {
                        this._io = _io;
                        this._parent = _parent;
                        this._root = _root || this;
                        this._read();
                    }
                    CertSlotExpr.prototype._read = function() {
                        this.value = this._io.readU4be();
                    }
                    return CertSlotExpr;
                })();
                var CertGenericExpr = Expr.CertGenericExpr = (function() {
                    function CertGenericExpr(_io, _parent, _root) {
                        this._io = _io;
                        this._parent = _parent;
                        this._root = _root || this;
                        this._read();
                    }
                    CertGenericExpr.prototype._read = function() {
                        this.certSlot = this._io.readU4be();
                        this.data = new Data(this._io, this, this._root);
                        this.match = new Match(this._io, this, this._root);
                    }
                    return CertGenericExpr;
                })();
                var IdentExpr = Expr.IdentExpr = (function() {
                    function IdentExpr(_io, _parent, _root) {
                        this._io = _io;
                        this._parent = _parent;
                        this._root = _root || this;
                        this._read();
                    }
                    IdentExpr.prototype._read = function() {
                        this.identifier = new Data(this._io, this, this._root);
                    }
                    return IdentExpr;
                })();
                var CertFieldExpr = Expr.CertFieldExpr = (function() {
                    function CertFieldExpr(_io, _parent, _root) {
                        this._io = _io;
                        this._parent = _parent;
                        this._root = _root || this;
                        this._read();
                    }
                    CertFieldExpr.prototype._read = function() {
                        this.certSlot = this._io.readU4be();
                        this.data = new Data(this._io, this, this._root);
                        this.match = new Match(this._io, this, this._root);
                    }
                    return CertFieldExpr;
                })();
                var AnchorHashExpr = Expr.AnchorHashExpr = (function() {
                    function AnchorHashExpr(_io, _parent, _root) {
                        this._io = _io;
                        this._parent = _parent;
                        this._root = _root || this;
                        this._read();
                    }
                    AnchorHashExpr.prototype._read = function() {
                        this.certSlot = this._io.readU4be();
                        this.data = new Data(this._io, this, this._root);
                    }
                    return AnchorHashExpr;
                })();
                var AppleGenericAnchorExpr = Expr.AppleGenericAnchorExpr = (function() {
                    function AppleGenericAnchorExpr(_io, _parent, _root) {
                        this._io = _io;
                        this._parent = _parent;
                        this._root = _root || this;
                        this._read();
                    }
                    AppleGenericAnchorExpr.prototype._read = function() {}
                    Object.defineProperty(AppleGenericAnchorExpr.prototype, 'value', {
                        get: function() {
                            if (this._m_value !== undefined)
                                return this._m_value;
                            this._m_value = "anchor apple generic";
                            return this._m_value;
                        }
                    });
                    return AppleGenericAnchorExpr;
                })();
                var EntitlementFieldExpr = Expr.EntitlementFieldExpr = (function() {
                    function EntitlementFieldExpr(_io, _parent, _root) {
                        this._io = _io;
                        this._parent = _parent;
                        this._root = _root || this;
                        this._read();
                    }
                    EntitlementFieldExpr.prototype._read = function() {
                        this.data = new Data(this._io, this, this._root);
                        this.match = new Match(this._io, this, this._root);
                    }
                    return EntitlementFieldExpr;
                })();
                var AndExpr = Expr.AndExpr = (function() {
                    function AndExpr(_io, _parent, _root) {
                        this._io = _io;
                        this._parent = _parent;
                        this._root = _root || this;
                        this._read();
                    }
                    AndExpr.prototype._read = function() {
                        this.left = new Expr(this._io, this, this._root);
                        this.right = new Expr(this._io, this, this._root);
                    }
                    return AndExpr;
                })();
                var OrExpr = Expr.OrExpr = (function() {
                    function OrExpr(_io, _parent, _root) {
                        this._io = _io;
                        this._parent = _parent;
                        this._root = _root || this;
                        this._read();
                    }
                    OrExpr.prototype._read = function() {
                        this.left = new Expr(this._io, this, this._root);
                        this.right = new Expr(this._io, this, this._root);
                    }
                    return OrExpr;
                })();
                return Expr;
            })();
            var BlobIndex = CsBlob.BlobIndex = (function() {
                BlobIndex.CsslotType = Object.freeze({
                    CODE_DIRECTORY: 0,
                    INFO_SLOT: 1,
                    REQUIREMENTS: 2,
                    RESOURCE_DIR: 3,
                    APPLICATION: 4,
                    ENTITLEMENTS: 5,
                    ALTERNATE_CODE_DIRECTORIES: 4096,
                    SIGNATURE_SLOT: 65536,
                    0: "CODE_DIRECTORY",
                    1: "INFO_SLOT",
                    2: "REQUIREMENTS",
                    3: "RESOURCE_DIR",
                    4: "APPLICATION",
                    5: "ENTITLEMENTS",
                    4096: "ALTERNATE_CODE_DIRECTORIES",
                    65536: "SIGNATURE_SLOT",
                });
                function BlobIndex(_io, _parent, _root) {
                    this._io = _io;
                    this._parent = _parent;
                    this._root = _root || this;
                    this._read();
                }
                BlobIndex.prototype._read = function() {
                    this.type = this._io.readU4be();
                    this.offset = this._io.readU4be();
                }
                Object.defineProperty(BlobIndex.prototype, 'blob', {
                    get: function() {
                        if (this._m_blob !== undefined)
                            return this._m_blob;
                        var io = this._parent._io;
                        var _pos = io.pos;
                        io.seek((this.offset - 8));
                        this._raw__m_blob = io.readBytesFull();
                        var _io__raw__m_blob = new KaitaiStream(this._raw__m_blob);
                        this._m_blob = new CsBlob(_io__raw__m_blob, this, this._root);
                        io.seek(_pos);
                        return this._m_blob;
                    }
                });
                return BlobIndex;
            })();
            var Match = CsBlob.Match = (function() {
                Match.Op = Object.freeze({
                    EXISTS: 0,
                    EQUAL: 1,
                    CONTAINS: 2,
                    BEGINS_WITH: 3,
                    ENDS_WITH: 4,
                    LESS_THAN: 5,
                    GREATER_THAN: 6,
                    LESS_EQUAL: 7,
                    GREATER_EQUAL: 8,
                    0: "EXISTS",
                    1: "EQUAL",
                    2: "CONTAINS",
                    3: "BEGINS_WITH",
                    4: "ENDS_WITH",
                    5: "LESS_THAN",
                    6: "GREATER_THAN",
                    7: "LESS_EQUAL",
                    8: "GREATER_EQUAL",
                });
                function Match(_io, _parent, _root) {
                    this._io = _io;
                    this._parent = _parent;
                    this._root = _root || this;
                    this._read();
                }
                Match.prototype._read = function() {
                    this.matchOp = this._io.readU4be();
                    if (this.matchOp != MachO.CsBlob.Match.Op.EXISTS) {
                        this.data = new Data(this._io, this, this._root);
                    }
                }
                return Match;
            })();
            var Requirement = CsBlob.Requirement = (function() {
                function Requirement(_io, _parent, _root) {
                    this._io = _io;
                    this._parent = _parent;
                    this._root = _root || this;
                    this._read();
                }
                Requirement.prototype._read = function() {
                    this.kind = this._io.readU4be();
                    this.expr = new Expr(this._io, this, this._root);
                }
                return Requirement;
            })();
            var BlobWrapper = CsBlob.BlobWrapper = (function() {
                function BlobWrapper(_io, _parent, _root) {
                    this._io = _io;
                    this._parent = _parent;
                    this._root = _root || this;
                    this._read();
                }
                BlobWrapper.prototype._read = function() {
                    this.data = this._io.readBytesFull();
                }
                return BlobWrapper;
            })();
            var Entitlements = CsBlob.Entitlements = (function() {
                function Entitlements(_io, _parent, _root) {
                    this._io = _io;
                    this._parent = _parent;
                    this._root = _root || this;
                    this._read();
                }
                Entitlements.prototype._read = function() {
                    this.count = this._io.readU4be();
                    this.items = new Array(this.count);
                    for (var i = 0; i < this.count; i++) {
                        this.items[i] = new EntitlementsBlobIndex(this._io, this, this._root);
                    }
                }
                return Entitlements;
            })();
            return CsBlob;
        })();
        var RoutinesCommand = MachO.RoutinesCommand = (function() {
            function RoutinesCommand(_io, _parent, _root) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this._read();
            }
            RoutinesCommand.prototype._read = function() {
                this.initAddress = this._io.readU4le();
                this.initModule = this._io.readU4le();
                this.reserved = this._io.readBytes(24);
            }
            return RoutinesCommand;
        })();
        var MachoFlags = MachO.MachoFlags = (function() {
            function MachoFlags(_io, _parent, _root, value) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this.value = value;
                this._read();
            }
            MachoFlags.prototype._read = function() {}
            /**
             * safe to divide up the sections into sub-sections via symbols for dead code stripping
             */
            Object.defineProperty(MachoFlags.prototype, 'subsectionsViaSymbols', {
                get: function() {
                    if (this._m_subsectionsViaSymbols !== undefined)
                        return this._m_subsectionsViaSymbols;
                    this._m_subsectionsViaSymbols = (this.value & 8192) != 0;
                    return this._m_subsectionsViaSymbols;
                }
            });
            Object.defineProperty(MachoFlags.prototype, 'deadStrippableDylib', {
                get: function() {
                    if (this._m_deadStrippableDylib !== undefined)
                        return this._m_deadStrippableDylib;
                    this._m_deadStrippableDylib = (this.value & 4194304) != 0;
                    return this._m_deadStrippableDylib;
                }
            });
            /**
             * the final linked image contains external weak symbols
             */
            Object.defineProperty(MachoFlags.prototype, 'weakDefines', {
                get: function() {
                    if (this._m_weakDefines !== undefined)
                        return this._m_weakDefines;
                    this._m_weakDefines = (this.value & 32768) != 0;
                    return this._m_weakDefines;
                }
            });
            /**
             * the file has its dynamic undefined references prebound.
             */
            Object.defineProperty(MachoFlags.prototype, 'prebound', {
                get: function() {
                    if (this._m_prebound !== undefined)
                        return this._m_prebound;
                    this._m_prebound = (this.value & 16) != 0;
                    return this._m_prebound;
                }
            });
            /**
             * indicates that this binary binds to all two-level namespace modules of its dependent libraries. only used when MH_PREBINDABLE and MH_TWOLEVEL are both set.
             */
            Object.defineProperty(MachoFlags.prototype, 'allModsBound', {
                get: function() {
                    if (this._m_allModsBound !== undefined)
                        return this._m_allModsBound;
                    this._m_allModsBound = (this.value & 4096) != 0;
                    return this._m_allModsBound;
                }
            });
            Object.defineProperty(MachoFlags.prototype, 'hasTlvDescriptors', {
                get: function() {
                    if (this._m_hasTlvDescriptors !== undefined)
                        return this._m_hasTlvDescriptors;
                    this._m_hasTlvDescriptors = (this.value & 8388608) != 0;
                    return this._m_hasTlvDescriptors;
                }
            });
            /**
             * the executable is forcing all images to use flat name space bindings
             */
            Object.defineProperty(MachoFlags.prototype, 'forceFlat', {
                get: function() {
                    if (this._m_forceFlat !== undefined)
                        return this._m_forceFlat;
                    this._m_forceFlat = (this.value & 256) != 0;
                    return this._m_forceFlat;
                }
            });
            /**
             * When this bit is set, the binary declares it is safe for use in processes with uid zero
             */
            Object.defineProperty(MachoFlags.prototype, 'rootSafe', {
                get: function() {
                    if (this._m_rootSafe !== undefined)
                        return this._m_rootSafe;
                    this._m_rootSafe = (this.value & 262144) != 0;
                    return this._m_rootSafe;
                }
            });
            /**
             * the object file has no undefined references
             */
            Object.defineProperty(MachoFlags.prototype, 'noUndefs', {
                get: function() {
                    if (this._m_noUndefs !== undefined)
                        return this._m_noUndefs;
                    this._m_noUndefs = (this.value & 1) != 0;
                    return this._m_noUndefs;
                }
            });
            /**
             * When this bit is set, the binary declares it is safe for use in processes when issetugid() is true
             */
            Object.defineProperty(MachoFlags.prototype, 'setuidSafe', {
                get: function() {
                    if (this._m_setuidSafe !== undefined)
                        return this._m_setuidSafe;
                    this._m_setuidSafe = (this.value & 524288) != 0;
                    return this._m_setuidSafe;
                }
            });
            Object.defineProperty(MachoFlags.prototype, 'noHeapExecution', {
                get: function() {
                    if (this._m_noHeapExecution !== undefined)
                        return this._m_noHeapExecution;
                    this._m_noHeapExecution = (this.value & 16777216) != 0;
                    return this._m_noHeapExecution;
                }
            });
            /**
             * When this bit is set on a dylib, the static linker does not need to examine dependent dylibs to see if any are re-exported
             */
            Object.defineProperty(MachoFlags.prototype, 'noReexportedDylibs', {
                get: function() {
                    if (this._m_noReexportedDylibs !== undefined)
                        return this._m_noReexportedDylibs;
                    this._m_noReexportedDylibs = (this.value & 1048576) != 0;
                    return this._m_noReexportedDylibs;
                }
            });
            /**
             * this umbrella guarantees no multiple defintions of symbols in its sub-images so the two-level namespace hints can always be used.
             */
            Object.defineProperty(MachoFlags.prototype, 'noMultiDefs', {
                get: function() {
                    if (this._m_noMultiDefs !== undefined)
                        return this._m_noMultiDefs;
                    this._m_noMultiDefs = (this.value & 512) != 0;
                    return this._m_noMultiDefs;
                }
            });
            Object.defineProperty(MachoFlags.prototype, 'appExtensionSafe', {
                get: function() {
                    if (this._m_appExtensionSafe !== undefined)
                        return this._m_appExtensionSafe;
                    this._m_appExtensionSafe = (this.value & 33554432) != 0;
                    return this._m_appExtensionSafe;
                }
            });
            /**
             * the binary is not prebound but can have its prebinding redone. only used when MH_PREBOUND is not set.
             */
            Object.defineProperty(MachoFlags.prototype, 'prebindable', {
                get: function() {
                    if (this._m_prebindable !== undefined)
                        return this._m_prebindable;
                    this._m_prebindable = (this.value & 2048) != 0;
                    return this._m_prebindable;
                }
            });
            /**
             * the object file is the output of an incremental link against a base file and can't be link edited again
             */
            Object.defineProperty(MachoFlags.prototype, 'incrLink', {
                get: function() {
                    if (this._m_incrLink !== undefined)
                        return this._m_incrLink;
                    this._m_incrLink = (this.value & 2) != 0;
                    return this._m_incrLink;
                }
            });
            /**
             * the object file's undefined references are bound by the dynamic linker when loaded.
             */
            Object.defineProperty(MachoFlags.prototype, 'bindAtLoad', {
                get: function() {
                    if (this._m_bindAtLoad !== undefined)
                        return this._m_bindAtLoad;
                    this._m_bindAtLoad = (this.value & 8) != 0;
                    return this._m_bindAtLoad;
                }
            });
            /**
             * the binary has been canonicalized via the unprebind operation
             */
            Object.defineProperty(MachoFlags.prototype, 'canonical', {
                get: function() {
                    if (this._m_canonical !== undefined)
                        return this._m_canonical;
                    this._m_canonical = (this.value & 16384) != 0;
                    return this._m_canonical;
                }
            });
            /**
             * the image is using two-level name space bindings
             */
            Object.defineProperty(MachoFlags.prototype, 'twoLevel', {
                get: function() {
                    if (this._m_twoLevel !== undefined)
                        return this._m_twoLevel;
                    this._m_twoLevel = (this.value & 128) != 0;
                    return this._m_twoLevel;
                }
            });
            /**
             * the file has its read-only and read-write segments split
             */
            Object.defineProperty(MachoFlags.prototype, 'splitSegs', {
                get: function() {
                    if (this._m_splitSegs !== undefined)
                        return this._m_splitSegs;
                    this._m_splitSegs = (this.value & 32) != 0;
                    return this._m_splitSegs;
                }
            });
            /**
             * the shared library init routine is to be run lazily via catching memory faults to its writeable segments (obsolete)
             */
            Object.defineProperty(MachoFlags.prototype, 'lazyInit', {
                get: function() {
                    if (this._m_lazyInit !== undefined)
                        return this._m_lazyInit;
                    this._m_lazyInit = (this.value & 64) != 0;
                    return this._m_lazyInit;
                }
            });
            /**
             * When this bit is set, all stacks in the task will be given stack execution privilege.  Only used in MH_EXECUTE filetypes.
             */
            Object.defineProperty(MachoFlags.prototype, 'allowStackExecution', {
                get: function() {
                    if (this._m_allowStackExecution !== undefined)
                        return this._m_allowStackExecution;
                    this._m_allowStackExecution = (this.value & 131072) != 0;
                    return this._m_allowStackExecution;
                }
            });
            /**
             * the final linked image uses weak symbols
             */
            Object.defineProperty(MachoFlags.prototype, 'bindsToWeak', {
                get: function() {
                    if (this._m_bindsToWeak !== undefined)
                        return this._m_bindsToWeak;
                    this._m_bindsToWeak = (this.value & 65536) != 0;
                    return this._m_bindsToWeak;
                }
            });
            /**
             * do not have dyld notify the prebinding agent about this executable
             */
            Object.defineProperty(MachoFlags.prototype, 'noFixPrebinding', {
                get: function() {
                    if (this._m_noFixPrebinding !== undefined)
                        return this._m_noFixPrebinding;
                    this._m_noFixPrebinding = (this.value & 1024) != 0;
                    return this._m_noFixPrebinding;
                }
            });
            /**
             * the object file is input for the dynamic linker and can't be staticly link edited again
             */
            Object.defineProperty(MachoFlags.prototype, 'dyldLink', {
                get: function() {
                    if (this._m_dyldLink !== undefined)
                        return this._m_dyldLink;
                    this._m_dyldLink = (this.value & 4) != 0;
                    return this._m_dyldLink;
                }
            });
            /**
             * When this bit is set, the OS will load the main executable at a random address. Only used in MH_EXECUTE filetypes.
             */
            Object.defineProperty(MachoFlags.prototype, 'pie', {
                get: function() {
                    if (this._m_pie !== undefined)
                        return this._m_pie;
                    this._m_pie = (this.value & 2097152) != 0;
                    return this._m_pie;
                }
            });
            return MachoFlags;
        })();
        var RoutinesCommand64 = MachO.RoutinesCommand64 = (function() {
            function RoutinesCommand64(_io, _parent, _root) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this._read();
            }
            RoutinesCommand64.prototype._read = function() {
                this.initAddress = this._io.readU8le();
                this.initModule = this._io.readU8le();
                this.reserved = this._io.readBytes(48);
            }
            return RoutinesCommand64;
        })();
        var LinkerOptionCommand = MachO.LinkerOptionCommand = (function() {
            function LinkerOptionCommand(_io, _parent, _root) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this._read();
            }
            LinkerOptionCommand.prototype._read = function() {
                this.numStrings = this._io.readU4le();
                this.strings = new Array(this.numStrings);
                for (var i = 0; i < this.numStrings; i++) {
                    this.strings[i] = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "utf-8");
                }
            }
            return LinkerOptionCommand;
        })();
        var SegmentCommand64 = MachO.SegmentCommand64 = (function() {
            function SegmentCommand64(_io, _parent, _root) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this._read();
            }
            SegmentCommand64.prototype._read = function() {
                this.segname = KaitaiStream.bytesToStr(KaitaiStream.bytesStripRight(this._io.readBytes(16), 0), "ascii");
                this.vmaddr = this._io.readU8le();
                this.vmsize = this._io.readU8le();
                this.fileoff = this._io.readU8le();
                this.filesize = this._io.readU8le();
                this.maxprot = new VmProt(this._io, this, this._root);
                this.initprot = new VmProt(this._io, this, this._root);
                this.nsects = this._io.readU4le();
                this.flags = this._io.readU4le();
                this.sections = new Array(this.nsects);
                for (var i = 0; i < this.nsects; i++) {
                    this.sections[i] = new Section64(this._io, this, this._root);
                }
            }
            var Section64 = SegmentCommand64.Section64 = (function() {
                function Section64(_io, _parent, _root) {
                    this._io = _io;
                    this._parent = _parent;
                    this._root = _root || this;
                    this._read();
                }
                Section64.prototype._read = function() {
                    this.sectName = KaitaiStream.bytesToStr(KaitaiStream.bytesStripRight(this._io.readBytes(16), 0), "ascii");
                    this.segName = KaitaiStream.bytesToStr(KaitaiStream.bytesStripRight(this._io.readBytes(16), 0), "ascii");
                    this.addr = this._io.readU8le();
                    this.size = this._io.readU8le();
                    this.offset = this._io.readU4le();
                    this.align = this._io.readU4le();
                    this.reloff = this._io.readU4le();
                    this.nreloc = this._io.readU4le();
                    this.flags = this._io.readU4le();
                    this.reserved1 = this._io.readU4le();
                    this.reserved2 = this._io.readU4le();
                    this.reserved3 = this._io.readU4le();
                }
                var CfStringList = Section64.CfStringList = (function() {
                    function CfStringList(_io, _parent, _root) {
                        this._io = _io;
                        this._parent = _parent;
                        this._root = _root || this;
                        this._read();
                    }
                    CfStringList.prototype._read = function() {
                        this.items = [];
                        var i = 0;
                        while (!this._io.isEof()) {
                            this.items.push(new CfString(this._io, this, this._root));
                            i++;
                        }
                    }
                    return CfStringList;
                })();
                var CfString = Section64.CfString = (function() {
                    function CfString(_io, _parent, _root) {
                        this._io = _io;
                        this._parent = _parent;
                        this._root = _root || this;
                        this._read();
                    }
                    CfString.prototype._read = function() {
                        this.isa = this._io.readU8le();
                        this.info = this._io.readU8le();
                        this.data = this._io.readU8le();
                        this.length = this._io.readU8le();
                    }
                    return CfString;
                })();
                var EhFrameItem = Section64.EhFrameItem = (function() {
                    function EhFrameItem(_io, _parent, _root) {
                        this._io = _io;
                        this._parent = _parent;
                        this._root = _root || this;
                        this._read();
                    }
                    EhFrameItem.prototype._read = function() {
                        this.length = this._io.readU4le();
                        if (this.length == 4294967295) {
                            this.length64 = this._io.readU8le();
                        }
                        this.id = this._io.readU4le();
                        if (this.length > 0) {
                            switch (this.id) {
                                case 0:
                                    this._raw_body = this._io.readBytes((this.length - 4));
                                    var _io__raw_body = new KaitaiStream(this._raw_body);
                                    this.body = new Cie(_io__raw_body, this, this._root);
                                    break;
                                default:
                                    this.body = this._io.readBytes((this.length - 4));
                                    break;
                            }
                        }
                    }
                    var CharChain = EhFrameItem.CharChain = (function() {
                        function CharChain(_io, _parent, _root) {
                            this._io = _io;
                            this._parent = _parent;
                            this._root = _root || this;
                            this._read();
                        }
                        CharChain.prototype._read = function() {
                            this.chr = this._io.readU1();
                            if (this.chr != 0) {
                                this.next = new CharChain(this._io, this, this._root);
                            }
                        }
                        return CharChain;
                    })();
                    var Cie = EhFrameItem.Cie = (function() {
                        function Cie(_io, _parent, _root) {
                            this._io = _io;
                            this._parent = _parent;
                            this._root = _root || this;
                            this._read();
                        }
                        Cie.prototype._read = function() {
                            this.version = this._io.readU1();
                            this.augStr = new CharChain(this._io, this, this._root);
                            this.codeAlignmentFactor = new Uleb128(this._io, this, this._root);
                            this.dataAlignmentFactor = new Uleb128(this._io, this, this._root);
                            this.returnAddressRegister = this._io.readU1();
                            if (this.augStr.chr == 122) {
                                this.augmentation = new AugmentationEntry(this._io, this, this._root);
                            }
                        }
                        return Cie;
                    })();
                    var AugmentationEntry = EhFrameItem.AugmentationEntry = (function() {
                        function AugmentationEntry(_io, _parent, _root) {
                            this._io = _io;
                            this._parent = _parent;
                            this._root = _root || this;
                            this._read();
                        }
                        AugmentationEntry.prototype._read = function() {
                            this.length = new Uleb128(this._io, this, this._root);
                            if (this._parent.augStr.next.chr == 82) {
                                this.fdePointerEncoding = this._io.readU1();
                            }
                        }
                        return AugmentationEntry;
                    })();
                    return EhFrameItem;
                })();
                var EhFrame = Section64.EhFrame = (function() {
                    function EhFrame(_io, _parent, _root) {
                        this._io = _io;
                        this._parent = _parent;
                        this._root = _root || this;
                        this._read();
                    }
                    EhFrame.prototype._read = function() {
                        this.items = [];
                        var i = 0;
                        while (!this._io.isEof()) {
                            this.items.push(new EhFrameItem(this._io, this, this._root));
                            i++;
                        }
                    }
                    return EhFrame;
                })();
                var PointerList = Section64.PointerList = (function() {
                    function PointerList(_io, _parent, _root) {
                        this._io = _io;
                        this._parent = _parent;
                        this._root = _root || this;
                        this._read();
                    }
                    PointerList.prototype._read = function() {
                        this.items = [];
                        var i = 0;
                        while (!this._io.isEof()) {
                            this.items.push(this._io.readU8le());
                            i++;
                        }
                    }
                    return PointerList;
                })();
                var StringList = Section64.StringList = (function() {
                    function StringList(_io, _parent, _root) {
                        this._io = _io;
                        this._parent = _parent;
                        this._root = _root || this;
                        this._read();
                    }
                    StringList.prototype._read = function() {
                        this.strings = [];
                        var i = 0;
                        while (!this._io.isEof()) {
                            this.strings.push(KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "ascii"));
                            i++;
                        }
                    }
                    return StringList;
                })();
                Object.defineProperty(Section64.prototype, 'data', {
                    get: function() {
                        if (this._m_data !== undefined)
                            return this._m_data;
                        var io = this._root._io;
                        var _pos = io.pos;
                        io.seek(this.offset);
                        switch (this.sectName) {
                            case "__objc_nlclslist":
                                this._raw__m_data = io.readBytes(this.size);
                                var _io__raw__m_data = new KaitaiStream(this._raw__m_data);
                                this._m_data = new PointerList(_io__raw__m_data, this, this._root);
                                break;
                            case "__objc_methname":
                                this._raw__m_data = io.readBytes(this.size);
                                var _io__raw__m_data = new KaitaiStream(this._raw__m_data);
                                this._m_data = new StringList(_io__raw__m_data, this, this._root);
                                break;
                            case "__nl_symbol_ptr":
                                this._raw__m_data = io.readBytes(this.size);
                                var _io__raw__m_data = new KaitaiStream(this._raw__m_data);
                                this._m_data = new PointerList(_io__raw__m_data, this, this._root);
                                break;
                            case "__la_symbol_ptr":
                                this._raw__m_data = io.readBytes(this.size);
                                var _io__raw__m_data = new KaitaiStream(this._raw__m_data);
                                this._m_data = new PointerList(_io__raw__m_data, this, this._root);
                                break;
                            case "__objc_selrefs":
                                this._raw__m_data = io.readBytes(this.size);
                                var _io__raw__m_data = new KaitaiStream(this._raw__m_data);
                                this._m_data = new PointerList(_io__raw__m_data, this, this._root);
                                break;
                            case "__cstring":
                                this._raw__m_data = io.readBytes(this.size);
                                var _io__raw__m_data = new KaitaiStream(this._raw__m_data);
                                this._m_data = new StringList(_io__raw__m_data, this, this._root);
                                break;
                            case "__objc_classlist":
                                this._raw__m_data = io.readBytes(this.size);
                                var _io__raw__m_data = new KaitaiStream(this._raw__m_data);
                                this._m_data = new PointerList(_io__raw__m_data, this, this._root);
                                break;
                            case "__objc_protolist":
                                this._raw__m_data = io.readBytes(this.size);
                                var _io__raw__m_data = new KaitaiStream(this._raw__m_data);
                                this._m_data = new PointerList(_io__raw__m_data, this, this._root);
                                break;
                            case "__objc_imageinfo":
                                this._raw__m_data = io.readBytes(this.size);
                                var _io__raw__m_data = new KaitaiStream(this._raw__m_data);
                                this._m_data = new PointerList(_io__raw__m_data, this, this._root);
                                break;
                            case "__objc_methtype":
                                this._raw__m_data = io.readBytes(this.size);
                                var _io__raw__m_data = new KaitaiStream(this._raw__m_data);
                                this._m_data = new StringList(_io__raw__m_data, this, this._root);
                                break;
                            case "__cfstring":
                                this._raw__m_data = io.readBytes(this.size);
                                var _io__raw__m_data = new KaitaiStream(this._raw__m_data);
                                this._m_data = new CfStringList(_io__raw__m_data, this, this._root);
                                break;
                            case "__objc_classrefs":
                                this._raw__m_data = io.readBytes(this.size);
                                var _io__raw__m_data = new KaitaiStream(this._raw__m_data);
                                this._m_data = new PointerList(_io__raw__m_data, this, this._root);
                                break;
                            case "__objc_protorefs":
                                this._raw__m_data = io.readBytes(this.size);
                                var _io__raw__m_data = new KaitaiStream(this._raw__m_data);
                                this._m_data = new PointerList(_io__raw__m_data, this, this._root);
                                break;
                            case "__objc_classname":
                                this._raw__m_data = io.readBytes(this.size);
                                var _io__raw__m_data = new KaitaiStream(this._raw__m_data);
                                this._m_data = new StringList(_io__raw__m_data, this, this._root);
                                break;
                            case "__got":
                                this._raw__m_data = io.readBytes(this.size);
                                var _io__raw__m_data = new KaitaiStream(this._raw__m_data);
                                this._m_data = new PointerList(_io__raw__m_data, this, this._root);
                                break;
                            case "__eh_frame":
                                this._raw__m_data = io.readBytes(this.size);
                                var _io__raw__m_data = new KaitaiStream(this._raw__m_data);
                                this._m_data = new EhFrame(_io__raw__m_data, this, this._root);
                                break;
                            case "__objc_superrefs":
                                this._raw__m_data = io.readBytes(this.size);
                                var _io__raw__m_data = new KaitaiStream(this._raw__m_data);
                                this._m_data = new PointerList(_io__raw__m_data, this, this._root);
                                break;
                            default:
                                this._m_data = io.readBytes(this.size);
                                break;
                        }
                        io.seek(_pos);
                        return this._m_data;
                    }
                });
                return Section64;
            })();
            return SegmentCommand64;
        })();
        var VmProt = MachO.VmProt = (function() {
            function VmProt(_io, _parent, _root) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this._read();
            }
            VmProt.prototype._read = function() {
                this.stripRead = this._io.readBitsInt(1) != 0;
                this.isMask = this._io.readBitsInt(1) != 0;
                this.reserved0 = this._io.readBitsInt(1) != 0;
                this.copy = this._io.readBitsInt(1) != 0;
                this.noChange = this._io.readBitsInt(1) != 0;
                this.execute = this._io.readBitsInt(1) != 0;
                this.write = this._io.readBitsInt(1) != 0;
                this.read = this._io.readBitsInt(1) != 0;
                this.reserved1 = this._io.readBitsInt(24);
            }
            /**
             * Special marker to support execute-only protection.
             */
            /**
             * Indicates to use value as a mask against the actual protection bits.
             */
            /**
             * Reserved (unused) bit.
             */
            /**
             * Used when write permission can not be obtained, to mark the entry as COW.
             */
            /**
             * Used only by memory_object_lock_request to indicate no change to page locks.
             */
            /**
             * Execute permission.
             */
            /**
             * Write permission.
             */
            /**
             * Read permission.
             */
            /**
             * Reserved (unused) bits.
             */
            return VmProt;
        })();
        var DysymtabCommand = MachO.DysymtabCommand = (function() {
            function DysymtabCommand(_io, _parent, _root) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this._read();
            }
            DysymtabCommand.prototype._read = function() {
                this.iLocalSym = this._io.readU4le();
                this.nLocalSym = this._io.readU4le();
                this.iExtDefSym = this._io.readU4le();
                this.nExtDefSym = this._io.readU4le();
                this.iUndefSym = this._io.readU4le();
                this.nUndefSym = this._io.readU4le();
                this.tocOff = this._io.readU4le();
                this.nToc = this._io.readU4le();
                this.modTabOff = this._io.readU4le();
                this.nModTab = this._io.readU4le();
                this.extRefSymOff = this._io.readU4le();
                this.nExtRefSyms = this._io.readU4le();
                this.indirectSymOff = this._io.readU4le();
                this.nIndirectSyms = this._io.readU4le();
                this.extRelOff = this._io.readU4le();
                this.nExtRel = this._io.readU4le();
                this.locRelOff = this._io.readU4le();
                this.nLocRel = this._io.readU4le();
            }
            Object.defineProperty(DysymtabCommand.prototype, 'indirectSymbols', {
                get: function() {
                    if (this._m_indirectSymbols !== undefined)
                        return this._m_indirectSymbols;
                    var io = this._root._io;
                    var _pos = io.pos;
                    io.seek(this.indirectSymOff);
                    this._m_indirectSymbols = new Array(this.nIndirectSyms);
                    for (var i = 0; i < this.nIndirectSyms; i++) {
                        this._m_indirectSymbols[i] = io.readU4le();
                    }
                    io.seek(_pos);
                    return this._m_indirectSymbols;
                }
            });
            return DysymtabCommand;
        })();
        var MachHeader = MachO.MachHeader = (function() {
            function MachHeader(_io, _parent, _root) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this._read();
            }
            MachHeader.prototype._read = function() {
                this.cputype = this._io.readU4le();
                this.cpusubtype = this._io.readU4le();
                this.filetype = this._io.readU4le();
                this.ncmds = this._io.readU4le();
                this.sizeofcmds = this._io.readU4le();
                this.flags = this._io.readU4le();
                if (((this._root.magic == MachO.MagicType.MACHO_BE_X64) || (this._root.magic == MachO.MagicType.MACHO_LE_X64))) {
                    this.reserved = this._io.readU4le();
                }
            }
            Object.defineProperty(MachHeader.prototype, 'flagsObj', {
                get: function() {
                    if (this._m_flagsObj !== undefined)
                        return this._m_flagsObj;
                    this._m_flagsObj = new MachoFlags(this._io, this, this._root, this.flags);
                    return this._m_flagsObj;
                }
            });
            return MachHeader;
        })();
        var LinkeditDataCommand = MachO.LinkeditDataCommand = (function() {
            function LinkeditDataCommand(_io, _parent, _root) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this._read();
            }
            LinkeditDataCommand.prototype._read = function() {
                this.dataOff = this._io.readU4le();
                this.dataSize = this._io.readU4le();
            }
            return LinkeditDataCommand;
        })();
        var SubCommand = MachO.SubCommand = (function() {
            function SubCommand(_io, _parent, _root) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this._read();
            }
            SubCommand.prototype._read = function() {
                this.name = new LcStr(this._io, this, this._root);
            }
            return SubCommand;
        })();
        var TwolevelHintsCommand = MachO.TwolevelHintsCommand = (function() {
            function TwolevelHintsCommand(_io, _parent, _root) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this._read();
            }
            TwolevelHintsCommand.prototype._read = function() {
                this.offset = this._io.readU4le();
                this.numHints = this._io.readU4le();
            }
            return TwolevelHintsCommand;
        })();
        var Version = MachO.Version = (function() {
            function Version(_io, _parent, _root) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this._read();
            }
            Version.prototype._read = function() {
                this.p1 = this._io.readU1();
                this.minor = this._io.readU1();
                this.major = this._io.readU1();
                this.release = this._io.readU1();
            }
            return Version;
        })();
        var EncryptionInfoCommand = MachO.EncryptionInfoCommand = (function() {
            function EncryptionInfoCommand(_io, _parent, _root) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this._read();
            }
            EncryptionInfoCommand.prototype._read = function() {
                this.cryptoff = this._io.readU4le();
                this.cryptsize = this._io.readU4le();
                this.cryptid = this._io.readU4le();
                if (((this._root.magic == MachO.MagicType.MACHO_BE_X64) || (this._root.magic == MachO.MagicType.MACHO_LE_X64))) {
                    this.pad = this._io.readU4le();
                }
            }
            return EncryptionInfoCommand;
        })();
        var CodeSignatureCommand = MachO.CodeSignatureCommand = (function() {
            function CodeSignatureCommand(_io, _parent, _root) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this._read();
            }
            CodeSignatureCommand.prototype._read = function() {
                this.dataOff = this._io.readU4le();
                this.dataSize = this._io.readU4le();
            }
            Object.defineProperty(CodeSignatureCommand.prototype, 'codeSignature', {
                get: function() {
                    if (this._m_codeSignature !== undefined)
                        return this._m_codeSignature;
                    var io = this._root._io;
                    var _pos = io.pos;
                    io.seek(this.dataOff);
                    this._raw__m_codeSignature = io.readBytes(this.dataSize);
                    var _io__raw__m_codeSignature = new KaitaiStream(this._raw__m_codeSignature);
                    this._m_codeSignature = new CsBlob(_io__raw__m_codeSignature, this, this._root);
                    io.seek(_pos);
                    return this._m_codeSignature;
                }
            });
            return CodeSignatureCommand;
        })();
        var DyldInfoCommand = MachO.DyldInfoCommand = (function() {
            DyldInfoCommand.BindOpcode = Object.freeze({
                DONE: 0,
                SET_DYLIB_ORDINAL_IMMEDIATE: 16,
                SET_DYLIB_ORDINAL_ULEB: 32,
                SET_DYLIB_SPECIAL_IMMEDIATE: 48,
                SET_SYMBOL_TRAILING_FLAGS_IMMEDIATE: 64,
                SET_TYPE_IMMEDIATE: 80,
                SET_APPEND_SLEB: 96,
                SET_SEGMENT_AND_OFFSET_ULEB: 112,
                ADD_ADDRESS_ULEB: 128,
                DO_BIND: 144,
                DO_BIND_ADD_ADDRESS_ULEB: 160,
                DO_BIND_ADD_ADDRESS_IMMEDIATE_SCALED: 176,
                DO_BIND_ULEB_TIMES_SKIPPING_ULEB: 192,
                0: "DONE",
                16: "SET_DYLIB_ORDINAL_IMMEDIATE",
                32: "SET_DYLIB_ORDINAL_ULEB",
                48: "SET_DYLIB_SPECIAL_IMMEDIATE",
                64: "SET_SYMBOL_TRAILING_FLAGS_IMMEDIATE",
                80: "SET_TYPE_IMMEDIATE",
                96: "SET_APPEND_SLEB",
                112: "SET_SEGMENT_AND_OFFSET_ULEB",
                128: "ADD_ADDRESS_ULEB",
                144: "DO_BIND",
                160: "DO_BIND_ADD_ADDRESS_ULEB",
                176: "DO_BIND_ADD_ADDRESS_IMMEDIATE_SCALED",
                192: "DO_BIND_ULEB_TIMES_SKIPPING_ULEB",
            });
            function DyldInfoCommand(_io, _parent, _root) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this._read();
            }
            DyldInfoCommand.prototype._read = function() {
                this.rebaseOff = this._io.readU4le();
                this.rebaseSize = this._io.readU4le();
                this.bindOff = this._io.readU4le();
                this.bindSize = this._io.readU4le();
                this.weakBindOff = this._io.readU4le();
                this.weakBindSize = this._io.readU4le();
                this.lazyBindOff = this._io.readU4le();
                this.lazyBindSize = this._io.readU4le();
                this.exportOff = this._io.readU4le();
                this.exportSize = this._io.readU4le();
            }
            var BindItem = DyldInfoCommand.BindItem = (function() {
                function BindItem(_io, _parent, _root) {
                    this._io = _io;
                    this._parent = _parent;
                    this._root = _root || this;
                    this._read();
                }
                BindItem.prototype._read = function() {
                    this.opcodeAndImmediate = this._io.readU1();
                    if (((this.opcode == MachO.DyldInfoCommand.BindOpcode.SET_DYLIB_ORDINAL_ULEB) || (this.opcode == MachO.DyldInfoCommand.BindOpcode.SET_APPEND_SLEB) || (this.opcode == MachO.DyldInfoCommand.BindOpcode.SET_SEGMENT_AND_OFFSET_ULEB) || (this.opcode == MachO.DyldInfoCommand.BindOpcode.ADD_ADDRESS_ULEB) || (this.opcode == MachO.DyldInfoCommand.BindOpcode.DO_BIND_ADD_ADDRESS_ULEB) || (this.opcode == MachO.DyldInfoCommand.BindOpcode.DO_BIND_ULEB_TIMES_SKIPPING_ULEB))) {
                        this.uleb = new Uleb128(this._io, this, this._root);
                    }
                    if (this.opcode == MachO.DyldInfoCommand.BindOpcode.DO_BIND_ULEB_TIMES_SKIPPING_ULEB) {
                        this.skip = new Uleb128(this._io, this, this._root);
                    }
                    if (this.opcode == MachO.DyldInfoCommand.BindOpcode.SET_SYMBOL_TRAILING_FLAGS_IMMEDIATE) {
                        this.symbol = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "ascii");
                    }
                }
                Object.defineProperty(BindItem.prototype, 'opcode', {
                    get: function() {
                        if (this._m_opcode !== undefined)
                            return this._m_opcode;
                        this._m_opcode = (this.opcodeAndImmediate & 240);
                        return this._m_opcode;
                    }
                });
                Object.defineProperty(BindItem.prototype, 'immediate', {
                    get: function() {
                        if (this._m_immediate !== undefined)
                            return this._m_immediate;
                        this._m_immediate = (this.opcodeAndImmediate & 15);
                        return this._m_immediate;
                    }
                });
                return BindItem;
            })();
            var RebaseData = DyldInfoCommand.RebaseData = (function() {
                RebaseData.Opcode = Object.freeze({
                    DONE: 0,
                    SET_TYPE_IMMEDIATE: 16,
                    SET_SEGMENT_AND_OFFSET_ULEB: 32,
                    ADD_ADDRESS_ULEB: 48,
                    ADD_ADDRESS_IMMEDIATE_SCALED: 64,
                    DO_REBASE_IMMEDIATE_TIMES: 80,
                    DO_REBASE_ULEB_TIMES: 96,
                    DO_REBASE_ADD_ADDRESS_ULEB: 112,
                    DO_REBASE_ULEB_TIMES_SKIPPING_ULEB: 128,
                    0: "DONE",
                    16: "SET_TYPE_IMMEDIATE",
                    32: "SET_SEGMENT_AND_OFFSET_ULEB",
                    48: "ADD_ADDRESS_ULEB",
                    64: "ADD_ADDRESS_IMMEDIATE_SCALED",
                    80: "DO_REBASE_IMMEDIATE_TIMES",
                    96: "DO_REBASE_ULEB_TIMES",
                    112: "DO_REBASE_ADD_ADDRESS_ULEB",
                    128: "DO_REBASE_ULEB_TIMES_SKIPPING_ULEB",
                });
                function RebaseData(_io, _parent, _root) {
                    this._io = _io;
                    this._parent = _parent;
                    this._root = _root || this;
                    this._read();
                }
                RebaseData.prototype._read = function() {
                    this.items = []
                    var i = 0;
                    do {
                        var _ = new RebaseItem(this._io, this, this._root);
                        this.items.push(_);
                        i++;
                    } while (!(_.opcode == MachO.DyldInfoCommand.RebaseData.Opcode.DONE));
                }
                var RebaseItem = RebaseData.RebaseItem = (function() {
                    function RebaseItem(_io, _parent, _root) {
                        this._io = _io;
                        this._parent = _parent;
                        this._root = _root || this;
                        this._read();
                    }
                    RebaseItem.prototype._read = function() {
                        this.opcodeAndImmediate = this._io.readU1();
                        if (((this.opcode == MachO.DyldInfoCommand.RebaseData.Opcode.SET_SEGMENT_AND_OFFSET_ULEB) || (this.opcode == MachO.DyldInfoCommand.RebaseData.Opcode.ADD_ADDRESS_ULEB) || (this.opcode == MachO.DyldInfoCommand.RebaseData.Opcode.DO_REBASE_ULEB_TIMES) || (this.opcode == MachO.DyldInfoCommand.RebaseData.Opcode.DO_REBASE_ADD_ADDRESS_ULEB) || (this.opcode == MachO.DyldInfoCommand.RebaseData.Opcode.DO_REBASE_ULEB_TIMES_SKIPPING_ULEB))) {
                            this.uleb = new Uleb128(this._io, this, this._root);
                        }
                        if (this.opcode == MachO.DyldInfoCommand.RebaseData.Opcode.DO_REBASE_ULEB_TIMES_SKIPPING_ULEB) {
                            this.skip = new Uleb128(this._io, this, this._root);
                        }
                    }
                    Object.defineProperty(RebaseItem.prototype, 'opcode', {
                        get: function() {
                            if (this._m_opcode !== undefined)
                                return this._m_opcode;
                            this._m_opcode = (this.opcodeAndImmediate & 240);
                            return this._m_opcode;
                        }
                    });
                    Object.defineProperty(RebaseItem.prototype, 'immediate', {
                        get: function() {
                            if (this._m_immediate !== undefined)
                                return this._m_immediate;
                            this._m_immediate = (this.opcodeAndImmediate & 15);
                            return this._m_immediate;
                        }
                    });
                    return RebaseItem;
                })();
                return RebaseData;
            })();
            var ExportNode = DyldInfoCommand.ExportNode = (function() {
                function ExportNode(_io, _parent, _root) {
                    this._io = _io;
                    this._parent = _parent;
                    this._root = _root || this;
                    this._read();
                }
                ExportNode.prototype._read = function() {
                    this.terminalSize = new Uleb128(this._io, this, this._root);
                    this.childrenCount = this._io.readU1();
                    this.children = new Array(this.childrenCount);
                    for (var i = 0; i < this.childrenCount; i++) {
                        this.children[i] = new Child(this._io, this, this._root);
                    }
                    this.terminal = this._io.readBytes(this.terminalSize.value);
                }
                var Child = ExportNode.Child = (function() {
                    function Child(_io, _parent, _root) {
                        this._io = _io;
                        this._parent = _parent;
                        this._root = _root || this;
                        this._read();
                    }
                    Child.prototype._read = function() {
                        this.name = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "ascii");
                        this.nodeOffset = new Uleb128(this._io, this, this._root);
                    }
                    Object.defineProperty(Child.prototype, 'value', {
                        get: function() {
                            if (this._m_value !== undefined)
                                return this._m_value;
                            var _pos = this._io.pos;
                            this._io.seek(this.nodeOffset.value);
                            this._m_value = new ExportNode(this._io, this, this._root);
                            this._io.seek(_pos);
                            return this._m_value;
                        }
                    });
                    return Child;
                })();
                return ExportNode;
            })();
            var BindData = DyldInfoCommand.BindData = (function() {
                function BindData(_io, _parent, _root) {
                    this._io = _io;
                    this._parent = _parent;
                    this._root = _root || this;
                    this._read();
                }
                BindData.prototype._read = function() {
                    this.items = []
                    var i = 0;
                    do {
                        var _ = new BindItem(this._io, this, this._root);
                        this.items.push(_);
                        i++;
                    } while (!(_.opcode == MachO.DyldInfoCommand.BindOpcode.DONE));
                }
                return BindData;
            })();
            var LazyBindData = DyldInfoCommand.LazyBindData = (function() {
                function LazyBindData(_io, _parent, _root) {
                    this._io = _io;
                    this._parent = _parent;
                    this._root = _root || this;
                    this._read();
                }
                LazyBindData.prototype._read = function() {
                    this.items = [];
                    var i = 0;
                    while (!this._io.isEof()) {
                        this.items.push(new BindItem(this._io, this, this._root));
                        i++;
                    }
                }
                return LazyBindData;
            })();
            Object.defineProperty(DyldInfoCommand.prototype, 'rebase', {
                get: function() {
                    if (this._m_rebase !== undefined)
                        return this._m_rebase;
                    var io = this._root._io;
                    var _pos = io.pos;
                    io.seek(this.rebaseOff);
                    this._raw__m_rebase = io.readBytes(this.rebaseSize);
                    var _io__raw__m_rebase = new KaitaiStream(this._raw__m_rebase);
                    this._m_rebase = new RebaseData(_io__raw__m_rebase, this, this._root);
                    io.seek(_pos);
                    return this._m_rebase;
                }
            });
            Object.defineProperty(DyldInfoCommand.prototype, 'bind', {
                get: function() {
                    if (this._m_bind !== undefined)
                        return this._m_bind;
                    var io = this._root._io;
                    var _pos = io.pos;
                    io.seek(this.bindOff);
                    this._raw__m_bind = io.readBytes(this.bindSize);
                    var _io__raw__m_bind = new KaitaiStream(this._raw__m_bind);
                    this._m_bind = new BindData(_io__raw__m_bind, this, this._root);
                    io.seek(_pos);
                    return this._m_bind;
                }
            });
            Object.defineProperty(DyldInfoCommand.prototype, 'lazyBind', {
                get: function() {
                    if (this._m_lazyBind !== undefined)
                        return this._m_lazyBind;
                    var io = this._root._io;
                    var _pos = io.pos;
                    io.seek(this.lazyBindOff);
                    this._raw__m_lazyBind = io.readBytes(this.lazyBindSize);
                    var _io__raw__m_lazyBind = new KaitaiStream(this._raw__m_lazyBind);
                    this._m_lazyBind = new LazyBindData(_io__raw__m_lazyBind, this, this._root);
                    io.seek(_pos);
                    return this._m_lazyBind;
                }
            });
            Object.defineProperty(DyldInfoCommand.prototype, 'exports', {
                get: function() {
                    if (this._m_exports !== undefined)
                        return this._m_exports;
                    var io = this._root._io;
                    var _pos = io.pos;
                    io.seek(this.exportOff);
                    this._raw__m_exports = io.readBytes(this.exportSize);
                    var _io__raw__m_exports = new KaitaiStream(this._raw__m_exports);
                    this._m_exports = new ExportNode(_io__raw__m_exports, this, this._root);
                    io.seek(_pos);
                    return this._m_exports;
                }
            });
            return DyldInfoCommand;
        })();
        var DylinkerCommand = MachO.DylinkerCommand = (function() {
            function DylinkerCommand(_io, _parent, _root) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this._read();
            }
            DylinkerCommand.prototype._read = function() {
                this.name = new LcStr(this._io, this, this._root);
            }
            return DylinkerCommand;
        })();
        var DylibCommand = MachO.DylibCommand = (function() {
            function DylibCommand(_io, _parent, _root) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this._read();
            }
            DylibCommand.prototype._read = function() {
                this.nameOffset = this._io.readU4le();
                this.timestamp = this._io.readU4le();
                this.currentVersion = this._io.readU4le();
                this.compatibilityVersion = this._io.readU4le();
                this.name = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "utf-8");
            }
            return DylibCommand;
        })();
        var LcStr = MachO.LcStr = (function() {
            function LcStr(_io, _parent, _root) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this._read();
            }
            LcStr.prototype._read = function() {
                this.length = this._io.readU4le();
                this.value = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "UTF-8");
            }
            return LcStr;
        })();
        var LoadCommand = MachO.LoadCommand = (function() {
            function LoadCommand(_io, _parent, _root) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this._read();
            }
            LoadCommand.prototype._read = function() {
                this.type = this._io.readU4le();
                this.size = this._io.readU4le();
                switch (this.type) {
                    case MachO.LoadCommandType.SUB_LIBRARY:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new SubCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.SEGMENT_SPLIT_INFO:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new LinkeditDataCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.RPATH:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new RpathCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.SOURCE_VERSION:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new SourceVersionCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.ENCRYPTION_INFO_64:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new EncryptionInfoCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.VERSION_MIN_TVOS:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new VersionMinCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.LOAD_DYLINKER:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new DylinkerCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.SUB_FRAMEWORK:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new SubCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.LOAD_WEAK_DYLIB:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new DylibCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.VERSION_MIN_IPHONEOS:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new VersionMinCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.LINKER_OPTIMIZATION_HINT:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new LinkeditDataCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.DYLD_ENVIRONMENT:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new DylinkerCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.LOAD_UPWARD_DYLIB:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new DylibCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.DYLIB_CODE_SIGN_DRS:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new LinkeditDataCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.DYLD_INFO:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new DyldInfoCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.REEXPORT_DYLIB:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new DylibCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.SYMTAB:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new SymtabCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.ROUTINES_64:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new RoutinesCommand64(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.ID_DYLINKER:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new DylinkerCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.MAIN:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new EntryPointCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.FUNCTION_STARTS:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new LinkeditDataCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.VERSION_MIN_MACOSX:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new VersionMinCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.DATA_IN_CODE:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new LinkeditDataCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.VERSION_MIN_WATCHOS:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new VersionMinCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.ENCRYPTION_INFO:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new EncryptionInfoCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.SUB_UMBRELLA:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new SubCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.LINKER_OPTION:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new LinkerOptionCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.TWOLEVEL_HINTS:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new TwolevelHintsCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.UUID:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new UuidCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.DYLD_INFO_ONLY:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new DyldInfoCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.LAZY_LOAD_DYLIB:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new DylibCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.SUB_CLIENT:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new SubCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.ROUTINES:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new RoutinesCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.CODE_SIGNATURE:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new CodeSignatureCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.DYSYMTAB:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new DysymtabCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.LOAD_DYLIB:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new DylibCommand(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.SEGMENT_64:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new SegmentCommand64(_io__raw_body, this, this._root);
                        break;
                    case MachO.LoadCommandType.ID_DYLIB:
                        this._raw_body = this._io.readBytes((this.size - 8));
                        var _io__raw_body = new KaitaiStream(this._raw_body);
                        this.body = new DylibCommand(_io__raw_body, this, this._root);
                        break;
                    default:
                        this.body = this._io.readBytes((this.size - 8));
                        break;
                }
            }
            return LoadCommand;
        })();
        var UuidCommand = MachO.UuidCommand = (function() {
            function UuidCommand(_io, _parent, _root) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this._read();
            }
            UuidCommand.prototype._read = function() {
                this.uuid = this._io.readBytes(16);
            }
            return UuidCommand;
        })();
        var SymtabCommand = MachO.SymtabCommand = (function() {
            function SymtabCommand(_io, _parent, _root) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this._read();
            }
            SymtabCommand.prototype._read = function() {
                this.symOff = this._io.readU4le();
                this.nSyms = this._io.readU4le();
                this.strOff = this._io.readU4le();
                this.strSize = this._io.readU4le();
            }
            var StrTable = SymtabCommand.StrTable = (function() {
                function StrTable(_io, _parent, _root) {
                    this._io = _io;
                    this._parent = _parent;
                    this._root = _root || this;
                    this._read();
                }
                StrTable.prototype._read = function() {
                    this.unknown = this._io.readU4le();
                    this.items = []
                    var i = 0;
                    do {
                        var _ = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "ascii");
                        this.items.push(_);
                        i++;
                    } while (!(_ == ""));
                }
                return StrTable;
            })();
            var Nlist64 = SymtabCommand.Nlist64 = (function() {
                function Nlist64(_io, _parent, _root) {
                    this._io = _io;
                    this._parent = _parent;
                    this._root = _root || this;
                    this._read();
                }
                Nlist64.prototype._read = function() {
                    this.un = this._io.readU4le();
                    this.type = this._io.readU1();
                    this.sect = this._io.readU1();
                    this.desc = this._io.readU2le();
                    this.value = this._io.readU8le();
                }
                return Nlist64;
            })();
            Object.defineProperty(SymtabCommand.prototype, 'symbols', {
                get: function() {
                    if (this._m_symbols !== undefined)
                        return this._m_symbols;
                    var io = this._root._io;
                    var _pos = io.pos;
                    io.seek(this.symOff);
                    this._m_symbols = new Array(this.nSyms);
                    for (var i = 0; i < this.nSyms; i++) {
                        this._m_symbols[i] = new Nlist64(io, this, this._root);
                    }
                    io.seek(_pos);
                    return this._m_symbols;
                }
            });
            Object.defineProperty(SymtabCommand.prototype, 'strs', {
                get: function() {
                    if (this._m_strs !== undefined)
                        return this._m_strs;
                    var io = this._root._io;
                    var _pos = io.pos;
                    io.seek(this.strOff);
                    this._raw__m_strs = io.readBytes(this.strSize);
                    var _io__raw__m_strs = new KaitaiStream(this._raw__m_strs);
                    this._m_strs = new StrTable(_io__raw__m_strs, this, this._root);
                    io.seek(_pos);
                    return this._m_strs;
                }
            });
            return SymtabCommand;
        })();
        var VersionMinCommand = MachO.VersionMinCommand = (function() {
            function VersionMinCommand(_io, _parent, _root) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this._read();
            }
            VersionMinCommand.prototype._read = function() {
                this.version = new Version(this._io, this, this._root);
                this.sdk = new Version(this._io, this, this._root);
            }
            return VersionMinCommand;
        })();
        var EntryPointCommand = MachO.EntryPointCommand = (function() {
            function EntryPointCommand(_io, _parent, _root) {
                this._io = _io;
                this._parent = _parent;
                this._root = _root || this;
                this._read();
            }
            EntryPointCommand.prototype._read = function() {
                this.entryOff = this._io.readU8le();
                this.stackSize = this._io.readU8le();
            }
            return EntryPointCommand;
        })();
        return MachO;
    })();
    return MachO;
}));

var MachOParser = function MachOParser(url) {
	var inlineParser = function(buffer) {
		MachOParser.data = new MachO(new KaitaiStream(buffer));
	};
	FileStorage.getcontents(FileStorage.mode.FETCH, url, inlineParser);
}