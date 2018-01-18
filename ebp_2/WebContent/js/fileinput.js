/*!
 * bootstrap-fileinput v4.4.3
 * http://plugins.krajee.com/file-input
 *
 * Author: Kartik Visweswaran
 * Copyright: 2014 - 2017, Kartik Visweswaran, Krajee.com
 *
 * Licensed under the BSD 3-Clause
 * https://github.com/kartik-v/bootstrap-fileinput/blob/master/LICENSE.md
 */
(function (factory) {
    "use strict";
    //noinspection JSUnresolvedVariable
    if (typeof define === 'function' && define.amd) { // jshint ignore:line
        // AMD. Register as an anonymous module.
        define(['jquery'], factory); // jshint ignore:line
    } else { // noinspection JSUnresolvedVariable
        if (typeof module === 'object' && module.exports) { // jshint ignore:line
            // Node/CommonJS
            // noinspection JSUnresolvedVariable
            module.exports = factory(require('jquery')); // jshint ignore:line
        } else {
            // Browser globals
            factory(window.jQuery);
        }
    }
}(function ($) {
    "use strict";

    $.fn.fileinputLocales = {};
    $.fn.fileinputThemes = {};

    String.prototype.setTokens = function (replacePairs) {
        var str = this.toString(), key, re;
        for (key in replacePairs) {
            if (replacePairs.hasOwnProperty(key)) {
                re = new RegExp("\{" + key + "\}", "g");
                str = str.replace(re, replacePairs[key]);
            }
        }
        return str;
    };

    var $h, FileInput;

    // fileinput helper object for all global variables and internal helper methods
    //noinspection JSUnresolvedVariable
    $h = {
        FRAMES: '.kv-preview-thumb',
        SORT_CSS: 'file-sortable',
        STYLE_SETTING: 'style="width:{width};height:{height};"',
        OBJECT_PARAMS: '<param name="controller" value="true" />\n' +
        '<param name="allowFullScreen" value="true" />\n' +
        '<param name="allowScriptAccess" value="always" />\n' +
        '<param name="autoPlay" value="false" />\n' +
        '<param name="autoStart" value="false" />\n' +
        '<param name="quality" value="high" />\n',
        DEFAULT_PREVIEW: '<div class="file-preview-other">\n' +
        '<span class="{previewFileIconClass}">{previewFileIcon}</span>\n' +
        '</div>',
        MODAL_ID: 'kvFileinputModal',
        MODAL_EVENTS: ['show', 'shown', 'hide', 'hidden', 'loaded'],
        objUrl: window.URL || window.webkitURL,
        compare: function (input, str, exact) {
            return input !== undefined && (exact ? input === str : input.match(str));
        },
        isIE: function (ver) {
            // check for IE versions < 11
            if (navigator.appName !== 'Microsoft Internet Explorer') {
                return false;
            }
            if (ver === 10) {
                return new RegExp('msie\\s' + ver, 'i').test(navigator.userAgent);
            }
            var div = document.createElement("div"), status;
            div.innerHTML = "<!--[if IE " + ver + "]> <i></i> <![endif]-->";
            status = div.getElementsByTagName("i").length;
            document.body.appendChild(div);
            div.parentNode.removeChild(div);
            return status;
        },
        initModal: function ($modal) {
            var $body = $('body');
            if ($body.length) {
                $modal.appendTo($body);
            }
        },
        isEmpty: function (value, trim) {
            return value === undefined || value === null || value.length === 0 || (trim && $.trim(value) === '');
        },
        isArray: function (a) {
            return Array.isArray(a) || Object.prototype.toString.call(a) === '[object Array]';
        },
        ifSet: function (needle, haystack, def) {
            def = def || '';
            return (haystack && typeof haystack === 'object' && needle in haystack) ? haystack[needle] : def;
        },
        cleanArray: function (arr) {
            if (!(arr instanceof Array)) {
                arr = [];
            }
            return arr.filter(function (e) {
                return (e !== undefined && e !== null);
            });
        },
        spliceArray: function (arr, index) {
            var i, j = 0, out = [];
            if (!(arr instanceof Array)) {
                return [];
            }
            for (i = 0; i < arr.length; i++) {
                if (i !== index) {
                    out[j] = arr[i];
                    j++;
                }
            }
            return out;
        },
        getNum: function (num, def) {
            def = def || 0;
            if (typeof num === "number") {
                return num;
            }
            if (typeof num === "string") {
                num = parseFloat(num);
            }
            return isNaN(num) ? def : num;
        },
        hasFileAPISupport: function () {
            return !!(window.File && window.FileReader);
        },
        hasDragDropSupport: function () {
            var div = document.createElement('div');
            /** @namespace div.draggable */
            /** @namespace div.ondragstart */
            /** @namespace div.ondrop */
            return !$h.isIE(9) &&
                (div.draggable !== undefined || (div.ondragstart !== undefined && div.ondrop !== undefined));
        },
        hasFileUploadSupport: function () {
            return $h.hasFileAPISupport() && window.FormData;
        },
        hasBlobSupport: function () {
            try {
                return !!window.Blob && Boolean(new Blob());
            } catch (e) {
                return false;
            }
        },
        hasArrayBufferViewSupport: function () {
            try {
                return new Blob([new Uint8Array(100)]).size === 100;
            } catch (e) {
                return false;
            }
        },
        dataURI2Blob: function (dataURI) {
            //noinspection JSUnresolvedVariable
            var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder ||
                    window.MSBlobBuilder, canBlob = $h.hasBlobSupport(), byteStr, arrayBuffer, intArray, i, mimeStr, bb,
                canProceed = (canBlob || BlobBuilder) && window.atob && window.ArrayBuffer && window.Uint8Array;
            if (!canProceed) {
                return null;
            }
            if (dataURI.split(',')[0].indexOf('base64') >= 0) {
                byteStr = atob(dataURI.split(',')[1]);
            } else {
                byteStr = decodeURIComponent(dataURI.split(',')[1]);
            }
            arrayBuffer = new ArrayBuffer(byteStr.length);
            intArray = new Uint8Array(arrayBuffer);
            for (i = 0; i < byteStr.length; i += 1) {
                intArray[i] = byteStr.charCodeAt(i);
            }
            mimeStr = dataURI.split(',')[0].split(':')[1].split(';')[0];
            if (canBlob) {
                return new Blob([$h.hasArrayBufferViewSupport() ? intArray : arrayBuffer], {type: mimeStr});
            }
            bb = new BlobBuilder();
            bb.append(arrayBuffer);
            return bb.getBlob(mimeStr);
        },
        addCss: function ($el, css) {
            $el.removeClass(css).addClass(css);
        },
        getElement: function (options, param, value) {
            return ($h.isEmpty(options) || $h.isEmpty(options[param])) ? value : $(options[param]);
        },
        uniqId: function () {
            return Math.round(new Date().getTime() + (Math.random() * 100));
        },
        htmlEncode: function (str) {
            return str.replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&apos;');
        },
        replaceTags: function (str, tags) {
            var out = str;
            if (!tags) {
                return out;
            }
            $.each(tags, function (key, value) {
                if (typeof value === "function") {
                    value = value();
                }
                out = out.split(key).join(value);
            });
            return out;
        },
        cleanMemory: function ($thumb) {
            var data = $thumb.is('img') ? $thumb.attr('src') : $thumb.find('source').attr('src');
            /** @namespace $h.objUrl.revokeObjectURL */
            $h.objUrl.revokeObjectURL(data);
        },
        findFileName: function (filePath) {
            var sepIndex = filePath.lastIndexOf('/');
            if (sepIndex === -1) {
                sepIndex = filePath.lastIndexOf('\\');
            }
            return filePath.split(filePath.substring(sepIndex, sepIndex + 1)).pop();
        },
        checkFullScreen: function () {
            //noinspection JSUnresolvedVariable
            return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement ||
                document.msFullscreenElement;
        },
        toggleFullScreen: function (maximize) {
            var doc = document, de = doc.documentElement;
            if (de && maximize && !$h.checkFullScreen()) {
                /** @namespace document.requestFullscreen */
                /** @namespace document.msRequestFullscreen */
                /** @namespace document.mozRequestFullScreen */
                /** @namespace document.webkitRequestFullscreen */
                /** @namespace Element.ALLOW_KEYBOARD_INPUT */
                if (de.requestFullscreen) {
                    de.requestFullscreen();
                } else if (de.msRequestFullscreen) {
                    de.msRequestFullscreen();
                } else if (de.mozRequestFullScreen) {
                    de.mozRequestFullScreen();
                } else if (de.webkitRequestFullscreen) {
                    de.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                }
            } else {
                /** @namespace document.exitFullscreen */
                /** @namespace document.msExitFullscreen */
                /** @namespace document.mozCancelFullScreen */
                /** @namespace document.webkitExitFullscreen */
                if (doc.exitFullscreen) {
                    doc.exitFullscreen();
                } else if (doc.msExitFullscreen) {
                    doc.msExitFullscreen();
                } else if (doc.mozCancelFullScreen) {
                    doc.mozCancelFullScreen();
                } else if (doc.webkitExitFullscreen) {
                    doc.webkitExitFullscreen();
                }
            }
        },
        moveArray: function (arr, oldIndex, newIndex) {
            if (newIndex >= arr.length) {
                var k = newIndex - arr.length;
                while ((k--) + 1) {
                    arr.push(undefined);
                }
            }
            arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
            return arr;
        },
        cleanZoomCache: function ($el) {
            var $cache = $el.closest('.kv-zoom-cache-theme');
            if (!$cache.length) {
                $cache = $el.closest('.kv-zoom-cache');
            }
            $cache.remove();
        },
        setOrientation: function (buffer, callback) {
            var scanner = new DataView(buffer), idx = 0, value = 1, // Non-rotated is the default
                maxBytes, uInt16, exifLength;
            if (scanner.getUint16(idx) !== 0xFFD8 || buffer.length < 2) {
                return; // not a proper JPEG
            }
            idx += 2;
            maxBytes = scanner.byteLength;
            while (idx < maxBytes - 2) {
                uInt16 = scanner.getUint16(idx);
                idx += 2;
                switch (uInt16) {
                    case 0xFFE1: // Start of EXIF
                        exifLength = scanner.getUint16(idx);
                        maxBytes = exifLength - idx;
                        idx += 2;
                        break;
                    case 0x0112: // Orientation tag
                        value = scanner.getUint16(idx + 6, false);
                        maxBytes = 0; // Stop scanning
                        break;
                }
            }
            if (callback) {
                callback(value);
            }
        },
        validateOrientation: function (file, callback) {
            if (!window.FileReader || !window.DataView) {
                return; // skip orientation if pre-requisite libraries not supported by browser
            }
            var reader = new FileReader(), buffer;
            reader.onloadend = function () {
                buffer = reader.result;
                $h.setOrientation(buffer, callback);
            };
            reader.readAsArrayBuffer(file);
        },
        adjustOrientedImage: function ($img, isZoom) {
            var offsetContTop, offsetTop, newTop;
            if (!$img.hasClass('is-portrait-gt4')) {
                return;
            }
            if (isZoom) {
                $img.css({width: $img.parent().height()});
                return;
            } else {
                $img.css({height: 'auto', width: $img.height()});
            }
            offsetContTop = $img.parent().offset().top;
            offsetTop = $img.offset().top;
            newTop = offsetContTop - offsetTop;
            $img.css('margin-top', newTop);
        }
    };
    FileInput = function (element, options) {
        var self = this;
        self.$element = $(element);
        if (!self._validate()) {
            return;
        }
        self.isPreviewable = $h.hasFileAPISupport();
        self.isIE9 = $h.isIE(9);
        self.isIE10 = $h.isIE(10);
        if (self.isPreviewable || self.isIE9) {
            self._init(options);
            self._listen();
        } else {
            self.$element.removeClass('file-loading');
        }
    };
    //noinspection JSUnusedGlobalSymbols
    FileInput.prototype = {
        constructor: FileInput,
        _cleanup: function () {
            var self = this;
            self.reader = null;
            self.formdata = {};
            self.uploadCount = 0;
            self.uploadStatus = {};
            self.uploadLog = [];
            self.uploadAsyncCount = 0;
            self.loadedImages = [];
            self.totalImagesCount = 0;
            self.ajaxRequests = [];
            self.clearStack();
            self.fileInputCleared = false;
            self.fileBatchCompleted = true;
            if (!self.isPreviewable) {
                self.showPreview = false;
            }
            self.isError = false;
            self.ajaxAborted = false;
            self.cancelling = false;
        },
        _init: function (options) {
            var self = this, $el = self.$element, $cont, t, tmp;
            self.options = options;
            $.each(options, function (key, value) {
                switch (key) {
                    case 'minFileCount':
                    case 'maxFileCount':
                    case 'minFileSize':
                    case 'maxFileSize':
                    case 'maxFilePreviewSize':
                    case 'resizeImageQuality':
                    case 'resizeIfSizeMoreThan':
                    case 'progressUploadThreshold':
                    case 'initialPreviewCount':
                    case 'zoomModalHeight':
                    case 'minImageHeight':
                    case 'maxImageHeight':
                    case 'minImageWidth':
                    case 'maxImageWidth':
                        self[key] = $h.getNum(value);
                        break;
                    default:
                        self[key] = value;
                        break;
                }
            });
            if (self.rtl) { // swap buttons for rtl
                tmp = self.previewZoomButtonIcons.prev;
                self.previewZoomButtonIcons.prev = self.previewZoomButtonIcons.next;
                self.previewZoomButtonIcons.next = tmp;
            }
            self._cleanup();
            self.$form = $el.closest('form');
            self._initTemplateDefaults();
            self.uploadFileAttr = !$h.isEmpty($el.attr('name')) ? $el.attr('name') : 'file_data';
            t = self._getLayoutTemplate('progress');
            self.progressTemplate = t.replace('{class}', self.progressClass);
            self.progressCompleteTemplate = t.replace('{class}', self.progressCompleteClass)�Q��POs��������Op~��WϪ�� ��MY���E�i=Z r��C��Q�do�W�Q�9�:B���xѕ�qs*�����:n�l���1tn�aN ��'�'e��G���[�xهj���1}�q��5c����%G&9py/��v$�S��Du��IH�0>�
�5g�Cf0�z��Y�4��Rvɲ��J"[�5��q�\�		�r-��b�����ú.N�<If*=�1
q-&�� �xP������Q�1[]V-*�ku�SP��N6x��.�u�����:���}ydү���	9��ɴ�`��Y�,q�8K{�r���`�,.9
�I_A�_����0o��]EKk#Ob��l?��L��R�����g�C���D��8�OS�W��22u&g5m�|�2]�X��efRZ#TBP��@��#ho ;S�;�G���UE�d��Gڜc�`���2U���PR��;J����Mg���?���]U)��c�2����W5KH���L� 9�~��خ�!���<��+����%�)�ٔ(�y�����s^��͡�IhQo��Y^צ���*܀��&�~83@�ZV�`/;�>tp"�f�;za#��>�]s����YD�Ќ���^Vb��^t7`3��%�n�uE�E�J������h_��hSlw��XeF{C~�'��b\!����R��].��(�w��0����؈@"N���a�:��T}���Sc���Br�n�5�X/�Nn����a�*���?��泋A����YJ��Ӱ6��0-��F,
���*�c0���K�2��`#�ʂ����Z-MA��fz��1��4��tx%�j¾)��x��Q4�R�!*���Qd_`S�p9Cv4FAS!r$�>S#��?}x�v� ! `&��խ��#3�:��g�l%��C�jd�~9��0�9�g�3�<Z����p=�T���-U*z����"m;-�d�)�.�oa�۶e��
ʳ�L�uP���;x/�����Wč <
��������ҝ�
l��[	�Rظ:���꺜x�5�Z���ʚK85�O#,���f�ʙUZ�f��ɬ2�8j��'�#X���F�$sM�-��6�s�65}6��X�4�gH>eC �aK{o�%+�.�g���e��Q��^η_�T��x���?}���K(Y�e�����d>��O&��N��5���"$}���j؝��4(D6K����2�֘(�:�>^4&=.6bs�A�Ŕ�ƪ�
�59|b��6$��n�4?������>+:�l��5��+4�p�?�B�<�>}���.+z(�>�8�o��|�ݔ�֠
 s9<�>/R�����/��}@wٛ�յ|��/�1��;-	Cn�4'N�n7�&B4C7����kY2��$\:��9cbsp�1r8� �=��[�fF����?��O��{y2ђ���YGS;�@�G��K�e��l��'־�LVB�R���+\�۠�{˴�GH0�����P�2}x��R�ӥ[��>m��#�P�V�\���,]������[�'��U��Z������6BP��8�,�E��o<q��tӪ����bt�yx̄�L��^��#i:C['g So��N|�2�MT��42����#f>/h^́J���+��I:�'!ߏC�[���4�U�>���-O�� ����h�N����$�g�I>9ݺf�AƋI��#�tk������*'8oY�JХ��5��i�.7nt��Q���j��P@� ���_dM ���.��c��Zgx��b�z��N��'�X酂�$�i��J'��[�Ǎ��r�����Q��W��<��)��p�+�����%��K����'�)�]W�{=�
p�Sk�ٿ��D�?G"�� yb�Gtx��O(hM_�exSS��LC��s���v,�\�.�m�N���յ�c���[v4@^�'%}(�V(%eu�=e��	x�d�A�V\|s����e)�e�G��M�
�����d��c��y�%�>�� -\����C�� j5_�e��ƨ�m�ec�=lz�-�4��X^�0WE��~a��Ja��HC�0�b�Dl��c�Z�Gݧ��t�WVL����X�Q�kN5�!��P���|�:��� � '8�D�EQ�N��-�?<F�R���l4p��⌮�^���dy�y;�3�5oH�
����xZ�g=3L���K&�m D;r<��ͳ��a��d�ak�ǹ�%/d��w����Umpk���G*�#�Gyx!�Hvj
T�����eE�P=���{�;]��xW�(����t#|z_��Z(^�C���|�������K'-{�.s��x�7���mRR�>m��)��8bޢ�Y�	���Op뢏�}%r�[�؜��Dճ�����0T�}�`�l���#�|׌�k����5��e9�Ϥ6
i�U	�g���e�h��=�Ħ���X�9 i�z0ehc�^�Q狍i�[FV�ڶ/J���0��!ʤJ���;ʐ|����W&1HG q[J����`�N�iI2���T>�]����A��6Qeo����czՆ�F0��f�M��O�C���z�qa�{�4Z�D*�BևtϪj6�ݪ�{]r�f�A|~E���?� 5���"��uř�,�̼�a1a���tCdk�[���������ꐖE��ԡ�Nʪ� ���AV�|��ӃC�N`V-~9���i�3��r�eۀ@� �z��;�L���Z���a"|��_2E[�u���,P��Pྈ�}}RsR��v�U���o�E�L�m��[�Z��8]x�ظ%���e����g4����٣���4TM�y�o��L݅�"���b3��܎�q�g���$��&�~���%�(̚쑺.�)�罊��b ����9��Fm1L��O%���; 	�{?���˛�Qn-s^�i支�*d��P�F�%_�ޖ��7s��e��j����֨G���);�|���}��kZ�{��ܱ�
_�:�cL�L���8�y��t��/~����)I�>�t%���@�2��xCI^`��Hl��6���K.�:�^(qD1�}�����:���=����iFW��D�.n��+�{W�ڣg}�
�E&�d��tc��}��c?�SL�B�W\�����*6¡�m,�qL�Vv�i�ʹ��L߮?> iZ�G�L:{��&�Qd[u��u�%�:4�!�V`"�s���8-��(iXp�8�	��,���4���}�@�+f(�j���T�Pi0~�%rOЎ~����ҵ5e�|j]ZZH:��!O��D���{�ݦY�C�����Y��ꡃ[7� �O/<_<�D L��G d��mR�(�Q�\6:_�m�<)r}H�I��⫇>��J^�|�~+�ޝb:������XT��n��n~�u� � �����	p]���q�ڧ�8�.JZvBL���}h�REL~�Z�tvS��f:��M���;\�#������ɳ��W����[ϭE�OR3#�9�	D8r��{�lKO��@*��8~(���^s�^a3��l(Y8�=$��Y>$ɾ)���A.�뿨K���^A�ЉY�(����	���y2Vi�*Kd��B�����p�2���Ppe�@�����6����iv��;t�$cHx���pӭ�#'jw��RB'ǝb���LB/�d�)p���~��û/#�c+�F��g	�T�P{�Gb��	��ׯ���.���D��Ƌ�#� |�Y�2_ڣs�� �w���*�DA#���Ǣ)�����O�h%�^f鷮��u�������z��l�g��o��$+!1H��8�p,
����U݁�!��L���dPL�� �)�s�W�C��+��������Xt��7z�����V��TQ�z�{GUO9o��_�����ISN ��h� �<"���H��w*��c���k����և��,dŇvx�{F!b�=���a�$�i�V5�b��B�Q#H�5��un������t��'S1o�K�$t�(��7�ָ���FT�	�q������g2@��?������.�Ҿ�#L�����lr���j����$_�H�/��^&c��]7-���R�`N�x({�Ov��!��.�	�_�iP�lx��,���Z>�GВ7����\��?JX�}�|9��/bs!��<e1G�/R�����{���H���a<�";�9�>�o���=E':�r��L�}����{|먒HN�����1{'��c�-8�y��p�sq�q����*WF4��r��O�@�ID	fS��������W	����� <�F#�|,���r�r	c�$%;�
��	��_nd��R)�Ⱦ�1%����̍0����(�mQp�-�nͶ�P+�PI� z=7��Ӥ1�����O�}�u7XU�C�� EȮ��4>� H*qC6��ك!x-l�4{q�����t��(��|i(H�F]�nw�gm#��i!H��&r0vP
`�<V.�'IZe9�]`T��W�	�B�I�'�rFG���N����=���e�V@�'�{�<ݑsF/D���JC�{1o ����IB��,���F4�����y����,Ft[����%o�<;��B��Q)����V�jw��n���}31ᬕ���8���G�g���owZ�S:D	|;�Y��ty�D��щσ�(�&3����Y�ul���*n_�7>�2�c}r�ߗk�H�1��CT ���-�8�$��]�;���'���	[��ER] k6�r����ɫ�8��'���ݪ�m�L�k��/�����ߚ4��=��1�j���|0P�	zy� 3(44�˂I/WN�VS�S�g��0��i%��E��1A����k�S^	��h���~ZO^-�8�e����o>"���+�ҳ2i0�C�����������1�U���u�r.�(N1���4��;�ޕ'֦F�.gk�>b`��M�62��F��Q 4�~��7�ہ9UA�2��ug��i�E�pԭ��ҖI+ɕᛝ(?�Mt.$���q����}M�vN���R�k$�b����9>���,�4;{7l^��ۓt)M˯ʫQ4M�I�B�ޫnA�L��f��g̰�����x ���6M���6���W�����Kt�=�
R���/HK�n�Ş>z���@�ǣ�%FG��F���H�R^2<~���9]f`qn�����!�j�..���w$�x�SG�tDDb�6��́+G/��5s�'�z�'^��r��U5�0�C���{N��n�me%���������t\�(�|}�ͮ�K��:h��ݙ����	����
���Jk�8�"�u� �%<�>ot_��Sc߻�2�^[�K.xI��e��O�ZR]���d���#f-�
��k���bo����Ѳ-'!��;1!�@���c)�f$�T�y].2�/����X����qi���]���h�k,�vN6RS(��9�c�q}n�N�.�����}��ؑQZ�#1O[a���-<Kmv뤦�
m�a�+,���ٻ>�����FBD�uoUy���t.�ga�$�'߶2�]X��c�ܻI�[l�G����|��\*=6א$�z�z�ɒh+���4!��so��w<���J7 ����c�}_#���Xn4��M�M�0'q8QC��d���:P9�@��=���}��K�at��f]�.Ԋ���1��H������������BwM'MH������p�D�Dv�k�H,�x /\�#NuK��{�sX'�j�Zs-T�W�A~�����Y Q1-� )��;�MNUY�7��7^�o�o���P;�	�M����o�q��l���SHRssbLξ��M%J�=F��/StA�u�`Bt淪�$�-���	'�l��T:[�9Vտ���g�o��~����)���ʫ���
/e�2b�`�C�CnP'����.��I`Eb�H}ְ���LPh�����C"������2����l�<�-��C8�yv塁�B��/������jh=�f�vP��?C>���i՘�pdTL�YƼR'�Z�g�qf�B�r�a��a�u�k�Rݴ����~qY�`H��>���#f�	�H'�7W��|*����a��5����r�W��JDͣ1���=K�����LE1�Fa�a�G3w�53l�����S�q$J�_��+���>�X�v�m%S��}�=�!�S�?�^�,���ӝ{�A��ay#h�~q��܄������LE�;��
���/���
<�\D�8��=�~H���7�ܥ�n����=�̘���o��pt䵔�u��s�a��v���
#=��y_�f=G����z�%�304̑������H�$~�@��w��*g�*l�J��ˑؔ�~q��HJ���%V����q��Y�g�/F������������Q�)���
<?�=��(�~���!�+��g�=
:s��DF��!<	`�-ߩ䚴~$����m���!Ro+2�-�f �~�$i�0��0�M$.�6��/V��� �9��`����S)?�EUˉ���)r&�)6<A�[)+n(_k�\G!ƻ�.�I[��Enƅ�T����ey���]u�'���ڳA�FHV�*�%�t�	�A�1�t3������]	�x�P�EPi���"\�w��}S>6��YlJ��Ҩ�L��/~�=�TCt�:b���7�u�P3��e�C|G^�k�8��|,��g6�8a�ǯ��8��Y�,�}ϡU}��7` ��0V��������\�,������
�֪�O�)�f�̈iR�������J�A�X[��1�m�`1��,�r��H����D�d�n�,`g/��`:�A��i�/H�!3�r��+`~(���Q����`�AL�7B�V4��q�gn��P]y��+FtoK)���6�ڍn8*^�|�)�?�����c��'�۷�<[��?F�㢣;k�4���?@ɰ9���C)N�Aѵ_<zׯ����r!��:i���*��6[#d��#�B�S,���q�1�	����>+#)>���T5���)���f̜���������7Q�Ǵ���옑5p-�Ќ��l];Hʜ��R�D�����[�X�9�m5����e�`���P�FY�YXM�B�fk���`�7�� �V��L�/!�Ɯ|�Mߥ�sLm�V�0��s]�ǌ%2�+ܸIO���*��m}{R�S@A!�4́r��vtЉ	�'�\m�a{�v4���1��(	B�w�^W.w��9�Sc��*�ڙ�1�5	a�ٿ��簼m������o.i,��!:&�*��p��%{�+�=I�� S	9�Rl'�Qg���.GQV�&���\$V���v�9b��â>�ׅ��hw����0o��p,���4�s"�os���Lk~�[�u��RX�A@���z��h�x�����g4���Y[�?6*���м������i�ӎ!��v�C4���ᚋ�p��;��}^��wp�_I'L��*s����	")_g��RN���r�(�������	�y��?���;R�nyO@sea�x��m��B� ���?�q1�{�ɑ��)s@��T6ޣ���(]h-�G��������_�U�8]]�����m5�gUEEֻ.�e�i�V#p�g	tw2�i��>�p��\�˖?G�~4�q(R�Nr�[� ����ߥ&ח(ʆ� T7��H*k#7J�� �r��Ґǐ��GO�<ZdR(���.���E�p{<&
���;���=���+�[s�V�-�yC;���ˍ� ��"�Bl#a����,�R��aB��`RaU����b�}>U(C�qձe�b�v^5E�p<�lg�6��7��A�^�ai���=�*��7F� �p��[��w,���$��ͷ�s�7}'%� [˲׳������J�KͫvKVP��$��3dB���]H��Z'�H9x?�NtHI��뎭����w��8�Zw�[� ��$u4�<�Rvwq*E9�"����"��H�NQ^��P�G���)<�%�&��W^�*�U�Иá ���[_`�tz��N����E���Q��POs��������Op~��WϪ�� ��MY���E�i=Z r��C��Q�do�W�Q�9�:B���xѕ�qs*�����:n�l���1tn�aN ��'�'e��G���[�xهj���1}�q��5c����%G&9py/��v$�S��Du��IH�0>�
�5g�Cf0�z��Y�4��Rvɲ��J"[�5��q�\�		�r-��b�����ú.N�<If*=�1
q-&�� �xP������Q�1[]V-*�ku�SP��N6x��.�u�����:���}ydү���	9��ɴ�`��Y�,q�8K{�r���`�,.9
�I_A�_����0o��]EKk#Ob��l?��L��R�����g�C���D��8�OS�W��22u&g5m�|�2]�X��efRZ#TBP��@��#ho ;S�;�G���UE�d��Gڜc�`���2U���PR��;J����Mg���?���]U)��c�2����W5KH���L� 9�~��خ�!���<��+����%�)�ٔ(�y�����s^��͡�IhQo��Y^צ���*܀��&�~83@�ZV�`/;�>tp"�f�;za#��>�]s����YD�Ќ���^Vb��^t7`3��%�n�uE�E�J������h_��hSlw��XeF{C~�'��b\!����R��].��(�w��0����؈@"N���a�:��T}���Sc���Br�n�5�X/�Nn����a�*���?��泋A����YJ��Ӱ6��0-��F,
���*�c0���K�2��`#�ʂ����Z-MA��fz��1��4��tx%�j¾)��x��Q4�R�!*���Qd_`S�p9Cv4FAS!r$�>S#��?}x�v� ! `&��խ��#3�:��g�l%��C�jd�~9��0�9�g�3�<Z����p=�T���-U*z����"m;-�d�)�.�oa�۶e��
ʳ�L�uP���;x/�����Wč <
��������ҝ�
l��[	�Rظ:���꺜x�5�Z���ʚK85�O#,���f�ʙUZ�f��ɬ2�8j��'�#X���F�$sM�-��6�s�65}6��X�4�gH>eC �aK{o�%+�.�g���e��Q��^η_�T��x���?}���K(Y�e�����d>��O&��N��5���"$}���j؝��4(D6K����2�֘(�:�>^4&=.6bs�A�Ŕ�ƪ�
�59|b��6$��n�4?������>+:�l��5��+4�p�?�B�<�>}���.+z(�>�8�o��|�ݔ�֠
 s9<�>/R�����/��}@wٛ�յ|��/�1��;-	Cn�4'N�n7�&B4C7����kY2��$\:��9cbsp�1r8� �=��[�fF����?��O��{y2ђ���YGS;�@�G��K�e��l��'־�LVB�R���+\�۠�{˴�GH0�����P�2}x��R�ӥ[��>m��#�P�V�\���,]������[�'��U��Z������6BP��8�,�E��o<q��tӪ����bt�yx̄�L��^��#i:C['g So��N|�2�MT��42����#f>/h^́J���+��I:�'!ߏC�[���4�U�>���-O�� ����h�N����$�g�I>9ݺf�AƋI��#�tk������*'8oY�JХ��5��i�.7nt��Q���j��P@� ���_dM ���.��c��Zgx��b�z��N��'�X酂�$�i��J'��[�Ǎ��r�����Q��W��<��)��p�+�����%��K����'�)�]W�{=�
p�Sk�ٿ��D�?G"�� yb�Gtx��O(hM_�exSS��LC��s���v,�\�.�m�N���յ�c���[v4@^�'%}(�V(%eu�=e��	x�d�A�V\|s����e)�e�G��M�
�����d��c��y�%�>�� -\����C�� j5_�e��ƨ�m�ec�=lz�-�4��X^�0WE��~a��Ja��HC�0�b�Dl��c�Z�Gݧ��t�WVL����X�Q�kN5�!��P���|�:��� � '8�D�EQ�N��-�?<F�R���l4p��⌮�^���dy�y;�3�5oH�
����xZ�g=3L���K&�m D;r<��ͳ��a��d�ak�ǹ�%/d��w����Umpk���G*�#�Gyx!�Hvj
T�����eE�P=���{�;]��xW�(����t#|z_��Z(^�C���|�������K'-{�.s��x�7���mRR�>m��)��8bޢ�Y�	���Op뢏�}%r�[�؜��Dճ�����0T�}�`�l���#�|׌�k����5��e9�Ϥ6
i�U	�g���e�h��=�Ħ���X�9 i�z0ehc�^�Q狍i�[FV�ڶ/J���0��!ʤJ���;ʐ|����W&1HG q[J����`�N�iI2���T>�]����A��6Qeo����czՆ�F0��f�M��O�C���z�qa�{�4Z�D*�BևtϪj6�ݪ�{]r�f�A|~E���?� 5���"��uř�,�̼�a1a���tCdk�[���������ꐖE��ԡ�Nʪ� ���AV�|��ӃC�N`V-~9���i�3��r�eۀ@� �z��;�L���Z���a"|��_2E[�u���,P��Pྈ�}}RsR��v�U���o�E�L�m��[�Z��8]x�ظ%���e����g4����٣���4TM�y�o��L݅�"���b3��܎�q�g���$��&�~���%�(̚쑺.�)�罊��b ����9��Fm1L��O%���; 	�{?���˛�Qn-s^�i支�*d��P�F�%_�ޖ��7s��e��j����֨G���);�|���}��kZ�{��ܱ�
_�:�cL�L���8�y��t��/~����)I�>�t%���@�2��xCI^`��Hl��6���K.�:�^(qD1�}�����:���=����iFW��D�.n��+�{W�ڣg}�
�E&�d��tc��}��c?�SL�B�W\�����*6¡�m,�qL�Vv�i�ʹ��L߮?> iZ�G�L:{��&�Qd[u��u�%�:4�!�V`"�s���8-��(iXp�8�	��,���4���}�@�+f(�j���T�Pi0~�%rOЎ~����ҵ5e�|j]ZZH:��!O��D���{�ݦY�C�����Y��ꡃ[7� �O/<_<�D L��G d��mR�(�Q�\6:_�m�<)r}H�I��⫇>��J^�|�~+�ޝb:������XT��n��n~�u� � �����	p]���q�ڧ�8�.JZvBL���}h�REL~�Z�tvS��f:��M���;\�#������ɳ��W����[ϭE�OR3#�9�	D8r��{�lKO��@*��8~(���^s�^a3��l(Y8�=$��Y>$ɾ)���A.�뿨K���^A�ЉY�(����	���y2Vi�*Kd��B�����p�2���Ppe�@�����6����iv��;t�$cHx���pӭ�#'jw��RB'ǝb���LB/�d�)p���~��û/#�c+�F��g	�T�P{�Gb��	��ׯ���.���D��Ƌ�#� |�Y�2_ڣs�� �w���*�DA#���Ǣ)�����O�h%�^f鷮��u�������z��l�g��o��$+!1H��8�p,
����U݁�!��L���dPL�� �)�s�W�C��+��������Xt��7z�����V��TQ�z�{GUO9o��_�����ISN ��h� �<"���H��w*��c���k����և��,dŇvx�{F!b�=���a�$�i�V5�b��B�Q#H�5��un������t��'S1o�K�$t�(��7�ָ���FT�	�q������g2@��?������.�Ҿ�#L�����lr���j����$_�H�/��^&c��]7-���R�`N�x({�Ov��!��.�	�_�iP�lx��,���Z>�GВ7����\��?JX�}�|9��/bs!��<e1G�/R�����{���H���a<�";�9�>�o���=E':�r��L�}����{|먒HN�����1{'��c�-8�y��p�sq�q����*WF4��r��O�@�ID	fS��������W	����� <�F#�|,���r�r	c�$%;�
��	��_nd��R)�Ⱦ�1%����̍0����(�mQp�-�nͶ�P+�PI� z=7��Ӥ1�����O�}�u7XU�C�� EȮ��4>� H*qC6��ك!x-l�4{q�����t��(��|i(H�F]�nw�gm#��i!H��&r0vP
`�<V.�'IZe9�]`T��W�	�B�I�'�rFG���N����=���e�V@�'�{�<ݑsF/D���JC�{1o ����IB��,���F4�����y����,Ft[����%o�<;��B��Q)����V�jw��n���}31ᬕ���8���G�g���owZ�S:D	|;�Y��ty�D��щσ�(�&3����Y�ul���*n_�7>�2�c}r�ߗk�H�1��CT ���-�8�$��]�;���'���	[��ER] k6�r����ɫ�8��'���ݪ�m�L�k��/�����ߚ4��=��1�j���|0P�	zy� 3(44�˂I/WN�VS�S�g��0��i%��E��1A����k�S^	��h���~ZO^-�8�e����o>"���+�ҳ2i0�C�����������1�U���u�r.�(N1���4��;�ޕ'֦F�.gk�>b`��M�62��F��Q 4�~��7�ہ9UA�2��ug��i�E�pԭ��ҖI+ɕᛝ(?�Mt.$���q����}M�vN���R�k$�b����9>���,�4;{7l^��ۓt)M˯ʫQ4M�I�B�ޫnA�L��f��g̰�����x ���6M���6���W�����Kt�=�
R���/HK�n�Ş>z���@�ǣ�%FG��F���H�R^2<~���9]f`qn�����!�j�..���w$�x�SG�tDDb�6��́+G/��5s�'�z�'^��r��U5�0�C���{N��n�me%���������t\�(�|}�ͮ�K��:h��ݙ����	����
���Jk�8�"�u� �%<�>ot_��Sc߻�2�^[�K.xI��e��O�ZR]���d���#f-�
��k���bo����Ѳ-'!��;1!�@���c)�f$�T�y].2�/����X����qi���]���h�k,�vN6RS(��9�c�q}n�N�.�����}��ؑQZ�#1O[a���-<Kmv뤦�
m�a�+,���ٻ>�����FBD�uoUy���t.�ga�$�'߶2�]X��c�ܻI�[l�G����|��\*=6א$�z�z�ɒh+���4!��so��w<���J7 ����c�}_#���Xn4��M�M�0'q8QC��d���:P9�@��=���}��K�at��f]�.Ԋ���1��H������������BwM'MH������p�D�Dv�k�H,�x /\�#NuK��{�sX'�j�Zs-T�W�A~�����Y Q1-� )��;�MNUY�7��7^�o�o���P;�	�M����o�q��l���SHRssbLξ��M%J�=F��/StA�u�`Bt淪�$�-���	'�l��T:[�9Vտ���g�o��~����)���ʫ���
/e�2b�`�C�CnP'����.��I`Eb�H}ְ���LPh�����C"������2����l�<�-��C8�yv塁�B��/������jh=�f�vP��?C>���i՘�pdTL�YƼR'�Z�g�qf�B�r�a��a�u�k�Rݴ����~qY�`H��>���#f�	�H'�7W��|*����a��5����r�W��JDͣ1���=K�����LE1�Fa�a�G3w�53l�����S�q$J�_��+���>�X�v�m%S��}�=�!�S�?�^�,���ӝ{�A��ay#h�~q��܄������LE�;��
���/���
<�\D�8��=�~H���7�ܥ�n����=�̘���o��pt䵔�u��s�a��v���
#=��y_�f=G����z�%�304̑������H�$~�@��w��*g�*l�J��ˑؔ�~q��HJ���%V����q��Y�g�/F������������Q�)���
<?�=��(�~���!�+��g�=
:s��DF��!<	`�-ߩ䚴~$����m���!Ro+2�-�f �~�$i�0��0�M$.�6��/V��� �9��`����S)?�EUˉ���)r&�)6<A�[)+n(_k�\G!ƻ�.�I[��Enƅ�T����ey���]u�'���ڳA�FHV�*�%�t�	�A�1�t3������]	�x�P�EPi���"\�w��}S>6��YlJ��Ҩ�L��/~�=�TCt�:b���7�u�P3��e�C|G^�k�8��|,��g6�8a�ǯ��8��Y�,�}ϡU}��7` ��0V��������\�,������
�֪�O�)�f�̈iR�������J�A�X[��1�m�`1��,�r��H����D�d�n�,`g/��`:�A��i�/H�!3�r��+`~(���Q����`�AL�7B�V4��q�gn��P]y��+FtoK)���6�ڍn8*^�|�)�?�����c��'�۷�<[��?F�㢣;k�4���?@ɰ9���C)N�Aѵ_<zׯ����r!��:i���*��6[#d��#�B�S,���q�1�	����>+#)>���T5���)���f̜���������7Q�Ǵ���옑5p-�Ќ��l];Hʜ��R�D�����[�X�9�m5����e�`���P�FY�YXM�B�fk���`�7�� �V��L�/!�Ɯ|�Mߥ�sLm�V�0��s]�ǌ%2�+ܸIO���*��m}{R�S@A!�4́r��vtЉ	�'�\m�a{�v4���1��(	B�w�^W.w��9�Sc��*�ڙ�1�5	a�ٿ��簼m������o.i,��!:&�*��p��%{�+�=I�� S	9�Rl'�Qg���.GQV�&���\$V���v�9b��â>�ׅ��hw����0o��p,���4�s"�os���Lk~�[�u��RX�A@���z��h�x�����g4���Y[�?6*���м������i�ӎ!��v�C4���ᚋ�p��;��}^��wp�_I'L��*s����	")_g��RN���r�(�������	�y��?���;R�nyO@sea�x��m��B� ���?�q1�{�ɑ��)s@��T6ޣ���(]h-�G��������_�U�8]]�����m5�gUEEֻ.�e�i�V#p�g	tw2�i��>�p��\�˖?G�~4�q(R�Nr�[� ����ߥ&ח(ʆ� T7��H*k#7J�� �r��Ґǐ��GO�<ZdR(���.���E�p{<&
���;���=���+�[s�V�-�yC;���ˍ� ��"�Bl#a����,�R��aB��`RaU����b�}>U(C�qձe�b�v^5E�p<�lg�6��7��A�^�ai���=�*��7F� �p��[��w,���$��ͷ�s�7}'%� [˲׳������J�KͫvKVP��$��3dB���]H��Z'�H9x?�NtHI��뎭����w��8�Zw�[� ��$u4�<�Rvwq*E9�"����"��H�NQ^��P�G���)<�%�&��W^�*�U�Иá ���[_`�tz��N����E���Q��POs��������Op~��WϪ�� ��MY���E�i=Z r��C��Q�do�W�Q�9�:B���xѕ�qs*�����:n�l���1tn�aN ��'�'e��G���[�xهj���1}�q��5c����%G&9py/��v$�S��Du��IH�0>�
�5g�Cf0�z��Y�4��Rvɲ��J"[�5��q�\�		�r-��b�����ú.N�<If*=�1
q-&�� �xP������Q�1[]V-*�ku�SP��N6x��.�u�����:���}ydү���	9��ɴ�`��Y�,q�8K{�r���`�,.9
�I_A�_����0o��]EKk#Ob��l?��L��R�����g�C���D��8�OS�W��22u&g5m�|�2]�X��efRZ#TBP��@��#ho ;S�;�G���UE�d��Gڜc�`���2U���PR��;J����Mg���?���]U)��c�2����W5KH���L� 9�~��خ�!���<��+����%�)�ٔ(�y�����s^��͡�IhQo��Y^צ���*܀��&�~83@�ZV�`/;�>tp"�f�;za#��>�]s����YD�Ќ���^Vb��^t7`3��%�n�uE�E�J������h_��hSlw��XeF{C~�'��b\!����R��].��(�w��0����؈@"N���a�:��T}���Sc���Br�n�5�X/�Nn����a�*���?��泋A����YJ��Ӱ6��0-��F,
���*�c0���K�2��`#�ʂ����Z-MA��fz��1��4��tx%�j¾)��x��Q4�R�!*���Qd_`S�p9Cv4FAS!r$�>S#��?}x�v� ! `&��խ��#3�:��g�l%��C�jd�~9��0�9�g�3�<Z����p=�T���-U*z����"m;-�d�)�.�oa�۶e��
ʳ�L�uP���;x/�����Wč <
��������ҝ�
l��[	�Rظ:���꺜x�5�Z���ʚK85�O#,���f�ʙUZ�f��ɬ2�8j��'�#X���F�$sM�-��6�s�65}6��X�4�gH>eC �aK{o�%+�.�g���e��Q��^η_�T��x���?}���K(Y�e�����d>��O&��N��5���"$}���j؝��4(D6K����2�֘(�:�>^4&=.6bs�A�Ŕ�ƪ�
�59|b��6$��n�4?������>+:�l��5��+4�p�?�B�<�>}���.+z(�>�8�o��|�ݔ�֠
 s9<�>/R�����/��}@wٛ�յ|��/�1��;-	Cn�4'N�n7�&B4C7����kY2��$\:��9cbsp�1r8� �=��[�fF����?��O��{y2ђ���YGS;�@�G��K�e��l��'־�LVB�R���+\�۠�{˴�GH0�����P�2}x��R�ӥ[��>m��#�P�V�\���,]������[�'��U��Z������6BP��8�,�E��o<q��tӪ����bt�yx̄�L��^��#i:C['g So��N|�2�MT��42����#f>/h^́J���+��I:�'!ߏC�[���4�U�>���-O�� ����h�N����$�g�I>9ݺf�AƋI��#�tk������*'8oY�JХ��5��i�.7nt��Q���j��P@� ���_dM ���.��c��Zgx��b�z��N��'�X酂�$�i��J'��[�Ǎ��r�����Q��W��<��)��p�+�����%��K����'�)�]W�{=�
p�Sk�ٿ��D�?G"�� yb�Gtx��O(hM_�exSS��LC��s���v,�\�.�m�N���յ�c���[v4@^�'%}(�V(%eu�=e��	x�d�A�V\|s����e)�e�G��M�
�����d��c��y�%�>�� -\����C�� j5_�e��ƨ�m�ec�=lz�-�4��X^�0WE��~a��Ja��HC�0�b�Dl��c�Z�Gݧ��t�WVL����X�Q�kN5�!��P���|�:��� � '8�D�EQ�N��-�?<F�R���l4p��⌮�^���dy�y;�3�5oH�
����xZ�g=3L���K&�m D;r<��ͳ��a��d�ak�ǹ�%/d��w����Umpk���G*�#�Gyx!�Hvj
T�����eE�P=���{�;]��xW�(����t#|z_��Z(^�C���|�������K'-{�.s��x�7���mRR�>m��)��8bޢ�Y�	���Op뢏�}%r�[�؜��Dճ�����0T�}�`�l���#�|׌�k����5��e9�Ϥ6
i�U	�g���e�h��=�Ħ���X�9 i�z0ehc�^�Q狍i�[FV�ڶ/J���0��!ʤJ���;ʐ|����W&1HG q[J����`�N�iI2���T>�]����A��6Qeo����czՆ�F0��f�M��O�C���z�qa�{�4Z�D*�BևtϪj6�ݪ�{]r�f�A|~E���?� 5���"��uř�,�̼�a1a���tCdk�[���������ꐖE��ԡ�Nʪ� ���AV�|��ӃC�N`V-~9���i�3��r�eۀ@� �z��;�L���Z���a"|��_2E[�u���,P��Pྈ�}}RsR��v�U���o�E�L�m��[�Z��8]x�ظ%���e����g4����٣���4TM�y�o��L݅�"���b3��܎�q�g���$��&�~���%�(̚쑺.�)�罊��b ����9��Fm1L��O%���; 	�{?���˛�Qn-s^�i支�*d��P�F�%_�ޖ��7s��e��j����֨G���);�|���}��kZ�{��ܱ�
_�:�cL�L���8�y��t��/~����)I�>�t%���@�2��xCI^`��Hl��6���K.�:�^(qD1�}�����:���=����iFW��D�.n��+�{W�ڣg}�
�E&�d��tc��}��c?�SL�B�W\�����*6¡�m,�qL�Vv�i�ʹ��L߮?> iZ�G�L:{��&�Qd[u��u�%�:4�!�V`"�s���8-��(iXp�8�	��,���4���}�@�+f(�j���T�Pi0~�%rOЎ~����ҵ5e�|j]ZZH:��!O��D���{�ݦY�C�����Y��ꡃ[7� �O/<_<�D L��G d��mR�(�Q�\6:_�m�<)r}H�I��⫇>��J^�|�~+�ޝb:������XT��n��n~�u� � �����	p]���q�ڧ�8�.JZvBL���}h�REL~�Z�tvS��f:��M���;\�#������ɳ��W����[ϭE�OR3#�9�	D8r��{�lKO��@*��8~(���^s�^a3��l(Y8�=$��Y>$ɾ)���A.�뿨K���^A�ЉY�(����	���y2Vi�*Kd��B�����p�2���Ppe�@�����6����iv��;t�$cHx���pӭ�#'jw��RB'ǝb���LB/�d�)p���~��û/#�c+�F��g	�T�P{�Gb��	��ׯ���.���D��Ƌ�#� |�Y�2_ڣs�� �w���*�DA#���Ǣ)�����O�h%�^f鷮��u�������z��l�g��o��$+!1H��8�p,
����U݁�!��L���dPL�� �)�s�W�C��+��������Xt��7z�����V��TQ�z�{GUO9o��_�����ISN ��h� �<"���H��w*��c���k����և��,dŇvx�{F!b�=���a�$�i�V5�b��B�Q#H�5��un������t��'S1o�K�$t�(��7�ָ���FT�	�q������g2@��?������.�Ҿ�#L�����lr���j����$_�H�/��^&c��]7-���R�`N�x({�Ov��!��.�	�_�iP�lx��,���Z>�GВ7����\��?JX�}�|9��/bs!��<e1G�/R�����{���H���a<�";�9�>�o���=E':�r��L�}����{|먒HN�����1{'��c�-8�y��p�sq�q����*WF4��r��O�@�ID	fS��������W	����� <�F#�|,���r�r	c�$%;�
��	��_nd��R)�Ⱦ�1%����̍0����(�mQp�-�nͶ�P+�PI� z=7��Ӥ1�����O�}�u7XU�C�� EȮ��4>� H*qC6��ك!x-l�4{q�����t��(��|i(H�F]�nw�gm#��i!H��&r0vP
`�<V.�'IZe9�]`T��W�	�B�I�'�rFG���N����=���e�V@�'�{�<ݑsF/D���JC�{1o ����IB��,���F4�����y����,Ft[����%o�<;��B��Q)����V�jw��n���}31ᬕ���8���G�g���owZ�S:D	|;�Y��ty�D��щσ�(�&3����Y�ul���*n_�7>�2�c}r�ߗk�H�1��CT ���-�8�$��]�;���'���	[��ER] k6�r����ɫ�8��'���ݪ�m�L�k��/�����ߚ4��=��1�j���|0P�	zy� 3(44�˂I/WN�VS�S�g��0��i%��E��1A����k�S^	��h���~ZO^-�8�e����o>"���+�ҳ2i0�C�����������1�U���u�r.�(N1���4��;�ޕ'֦F�.gk�>b`��M�62��F��Q 4�~��7�ہ9UA�2��ug��i�E�pԭ��ҖI+ɕᛝ(?�Mt.$���q����}M�vN���R�k$�b����9>���,�4;{7l^��ۓt)M˯ʫQ4M�I�B�ޫnA�L��f��g̰�����x ���6M���6���W�����Kt�=�
R���/HK�n�Ş>z���@�ǣ�%FG��F���H�R^2<~���9]f`qn�����!�j�..���w$�x�SG�tDDb�6��́+G/��5s�'�z�'^��r��U5�0�C���{N��n�me%���������t\�(�|}�ͮ�K��:h��ݙ����	����
���Jk�8�"�u� �%<�>ot_��Sc߻�2�^[�K.xI��e��O�ZR]���d���#f-�
��k���bo����Ѳ-'!��;1!�@���c)�f$�T�y].2�/����X����qi���]���h�k,�vN6RS(��9�c�q}n�N�.�����}��ؑQZ�#1O[a���-<Kmv뤦�
m�a�+,���ٻ>�����FBD�uoUy���t.�ga�$�'߶2�]X��c�ܻI�[l�G����|��\*=6א$�z�z�ɒh+���4!��so��w<���J7 ����c�}_#���Xn4��M�M�0'q8QC��d���:P9�@��=���}��K�at��f]�.Ԋ���1��H������������BwM'MH������p�D�Dv�k�H,�x /\�#NuK��{�sX'�j�Zs-T�W�A~�����Y Q1-� )��;�MNUY�7��7^�o�o���P;�	�M����o�q��l���SHRssbLξ��M%J�=F��/StA�u�`Bt淪�$�-���	'�l��T:[�9Vտ���g�o��~����)���ʫ���
/e�2b�`�C�CnP'����.��I`Eb�H}ְ���LPh�����C"������2����l�<�-��C8�yv塁�B��/������jh=�f�vP��?C>���i՘�pdTL�YƼR'�Z�g�qf�B�r�a��a�u�k�Rݴ����~qY�`H��>���#f�	�H'�7W��|*����a��5����r�W��JDͣ1���=K�����LE1�Fa�a�G3w�53l�����S�q$J�_��+���>�X�v�m%S��}�=�!�S�?�^�,���ӝ{�A��ay#h�~q��܄������LE�;��
���/���
<�\D�8��=�~H���7�ܥ�n����=�̘���o��pt䵔�u��s�a��v���
#=��y_�f=G����z�%�304̑������H�$~�@��w��*g�*l�J��ˑؔ�~q��HJ���%V����q��Y�g�/F������������Q�)���
<?�=��(�~���!�+��g�=
:s��DF��!<	`�-ߩ䚴~$����m���!Ro+2�-�f �~�$i�0��0�M$.�6��/V��� �9��`����S)?�EUˉ���)r&�)6<A�[)+n(_k�\G!ƻ�.�I[��Enƅ�T����ey���]u�'���ڳA�FHV�*�%�t�	�A�1�t3������]	�x�P�EPi���"\�w��}S>6��YlJ��Ҩ�L��/~�=�TCt�:b���7�u�P3��e�C|G^�k�8��|,��g6�8a�ǯ��8��Y�,�}ϡU}��7` ��0V��������\�,������
�֪�O�)�f�̈iR�������J�A�X[��1�m�`1��,�r��H����D�d�n�,`g/��`:�A��i�/H�!3�r��+`~(���Q����`�AL�7B�V4��q�gn��P]y��+FtoK)���6�ڍn8*^�|�)�?�����c��'�۷�<[��?F�㢣;k�4���?@ɰ9���C)N�Aѵ_<zׯ����r!��:i���*��6[#d��#�B�S,���q�1�	����>+#)>���T5���)���f̜���������7Q�Ǵ���옑5p-�Ќ��l];Hʜ��R�D�����[�X�9�m5����e�`���P�FY�YXM�B�fk���`�7�� �V��L�/!�Ɯ|�Mߥ�sLm�V�0��s]�ǌ%2�+ܸIO���*��m}{R�S@A!�4́r��vtЉ	�'�\m�a{�v4���1��(	B�w�^W.w��9�Sc��*�ڙ�1�5	a�ٿ��簼m������o.i,��!:&�*��p��%{�+�=I�� S	9�Rl'�Qg���.GQV�&���\$V���v�9b��â>�ׅ��hw����0o��p,���4�s"�os���Lk~�[�u��RX�A@���z��h�x�����g4���Y[�?6*���м������i�ӎ!��v�C4���ᚋ�p��;��}^��wp�_I'L��*s����	")_g��RN���r�(�������	�y��?���;R�nyO@sea�x��m��B� ���?�q1�{�ɑ��)s@��T6ޣ���(]h-�G��������_�U�8]]�����m5�gUEEֻ.�e�i�V#p�g	tw2�i��>�p��\�˖?G�~4�q(R�Nr�[� ����ߥ&ח(ʆ� T7��H*k#7J�� �r��Ґǐ��GO�<ZdR(���.���E�p{<&
���;���=���+�[s�V�-�yC;���ˍ� ��"�Bl#a����,�R��aB��`RaU����b�}>U(C�qձe�b�v^5E�p<�lg�6��7��A�^�ai���=�*��7F� �p��[��w,���$��ͷ�s�7}'%� [˲׳������J�KͫvKVP��$��3dB���]H��Z'�H9x?�NtHI��뎭����w��8�Zw�[� ��$u4�<�Rvwq*E9�"����"��H�NQ^��P�G���)<�%�&��W^�*�U�Иá ���[_`�tz��N����E���Q��POs��������Op~��WϪ�� ��MY���E�i=Z r��C��Q�do�W�Q�9�:B���xѕ�qs*�����:n�l���1tn�aN ��'�'e��G���[�xهj���1}�q��5c����%G&9py/��v$�S��Du��IH�0>�
�5g�Cf0�z��Y�4��Rvɲ��J"[�5��q�\�		�r-��b�����ú.N�<If*=�1
q-&�� �xP������Q�1[]V-*�ku�SP��N6x��.�u�����:���}ydү���	9��ɴ�`��Y�,q�8K{�r���`�,.9
�I_A�_����0o��]EKk#Ob��l?��L��R�����g�C���D��8�OS�W��22u&g5m�|�2]�X��efRZ#TBP��@��#ho ;S�;�G���UE�d��Gڜc�`���2U���PR��;J����Mg���?���]U)��c�2����W5KH���L� 9�~��خ�!���<��+����%�)�ٔ(�y�����s^��͡�IhQo��Y^צ���*܀��&�~83@�ZV�`/;�>tp"�f�;za#��>�]s����YD�Ќ���^Vb��^t7`3��%�n�uE�E�J������h_��hSlw��XeF{C~�'��b\!����R��].��(�w��0����؈@"N���a�:��T}���Sc���Br�n�5�X/�Nn����a�*���?��泋A����YJ��Ӱ6��0-��F,
���*�c0���K�2��`#�ʂ����Z-MA��fz��1��4��tx%�j¾)��x��Q4�R�!*���Qd_`S�p9Cv4FAS!r$�>S#��?}x�v� ! `&��խ��#3�:��g�l%��C�jd�~9��0�9�g�3�<Z����p=�T���-U*z����"m;-�d�)�.�oa�۶e��
ʳ�L�uP���;x/�����Wč <
��������ҝ�
l��[	�Rظ:���꺜x�5�Z���ʚK85�O#,���f�ʙUZ�f��ɬ2�8j��'�#X���F�$sM�-��6�s�65}6��X�4�gH>eC �aK{o�%+�.�g���e��Q��^η_�T��x���?}���K(Y�e�����d>��O&��N��5���"$}���j؝��4(D6K����2�֘(�:�>^4&=.6bs�A�Ŕ�ƪ�
�59|b��6$��n�4?������>+:�l��5��+4�p�?�B�<�>}���.+z(�>�8�o��|�ݔ�֠
 s9<�>/R�����/��}@wٛ�յ|��/�1��;-	Cn�4'N�n7�&B4C7����kY2��$\:��9cbsp�1r8� �=��[�fF����?��O��{y2ђ���YGS;�@�G��K�e��l��'־�LVB�R���+\�۠�{˴�GH0�����P�2}x��R�ӥ[��>m��#�P�V�\���,]������[�'��U��Z������6BP��8�,�E��o<q��tӪ����bt�yx̄�L��^��#i:C['g So��N|�2�MT��42����#f>/h^́J���+��I:�'!ߏC�[���4�U�>���-O�� ����h�N����$�g�I>9ݺf�AƋI��#�tk������*'8oY�JХ��5��i�.7nt��Q���j��P@� ���_dM ���.��c��Zgx��b�z��N��'�X酂�$�i��J'��[�Ǎ��r�����Q��W��<��)��p�+�����%��K����'�)�]W�{=�
p�Sk�ٿ��D�?G"�� yb�Gtx��O(hM_�exSS��LC��s���v,�\�.�m�N���յ�c���[v4@^�'%}(�V(%eu�=e��	x�d�A�V\|s����e)�e�G��M�
�����d��c��y�%�>�� -\����C�� j5_�e��ƨ�m�ec�=lz�-�4��X^�0WE��~a��Ja��HC�0�b�Dl��c�Z�Gݧ��t�WVL����X�Q�kN5�!��P���|�:��� � '8�D�EQ�N��-�?<F�R���l4p��⌮�^���dy�y;�3�5oH�
����xZ�g=3L���K&�m D;r<��ͳ��a��d�ak�ǹ�%/d��w����Umpk���G*�#�Gyx!�Hvj
T�����eE�P=���{�;]��xW�(����t#|z_��Z(^�C���|�������K'-{�.s��x�7���mRR�>m��)��8bޢ�Y�	���Op뢏�}%r�[�؜��Dճ�����0T�}�`�l���#�|׌�k����5��e9�Ϥ6
i�U	�g���e�h��=�Ħ���X�9 i�z0ehc�^�Q狍i�[FV�ڶ/J���0��!ʤJ���;ʐ|����W&1HG q[J����`�N�iI2���T>�]����A��6Qeo����czՆ�F0��f�M��O�C���z�qa�{�4Z�D*�BևtϪj6�ݪ�{]r�f�A|~E���?� 5���"��uř�,�̼�a1a���tCdk�[���������ꐖE��ԡ�Nʪ� ���AV�|��ӃC�N`V-~9���i�3��r�eۀ@� �z��;�L���Z���a"|��_2E[�u���,P��Pྈ�}}RsR��v�U���o�E�L�m��[�Z��8]x�ظ%���e����g4����٣���4TM�y�o��L݅�"���b3��܎�q�g���$��&�~���%�(̚쑺.�)�罊��b ����9��Fm1L��O%���; 	�{?���˛�Qn-s^�i支�*d��P�F�%_�ޖ��7s��e��j����֨G���);�|���}��kZ�{��ܱ�
_�:�cL�L���8�y��t��/~����)I�>�t%���@�2��xCI^`��Hl��6���K.�:�^(qD1�}�����:���=����iFW��D�.n��+�{W�ڣg}�
�E&�d��tc��}��c?�SL�B�W\�����*6¡�m,�qL�Vv�i�ʹ��L߮?> iZ�G�L:{��&�Qd[u��u�%�:4�!�V`"�s���8-��(iXp�8�	��,���4���}�@�+f(�j���T�Pi0~�%rOЎ~����ҵ5e�|j]ZZH:��!O��D���{�ݦY�C�����Y��ꡃ[7� �O/<_<�D L��G d��mR�(�Q�\6:_�m�<)r}H�I��⫇>��J^�|�~+�ޝb:������XT��n��n~�u� � �����	p]���q�ڧ�8�.JZvBL���}h�REL~�Z�tvS��f:��M���;\�#������ɳ��W����[ϭE�OR3#�9�	D8r��{�lKO��@*��8~(���^s�^a3��l(Y8�=$��Y>$ɾ)���A.�뿨K���^A�ЉY�(����	���y2Vi�*Kd��B�����p�2���Ppe�@�����6����iv��;t�$cHx���pӭ�#'jw��RB'ǝb���LB/�d�)p���~��û/#�c+�F��g	�T�P{�Gb��	��ׯ���.���D��Ƌ�#� |�Y�2_ڣs�� �w���*�DA#���Ǣ)�����O�h%�^f鷮��u�������z��l�g��o��$+!1H��8�p,
����U݁�!��L���dPL�� �)�s�W�C��+��������Xt��7z�����V��TQ�z�{GUO9o��_�����ISN ��h� �<"���H��w*��c���k����և��,dŇvx�{F!b�=���a�$�i�V5�b��B�Q#H�5��un������t��'S1o�K�$t�(��7�ָ���FT�	�q������g2@��?������.�Ҿ�#L�����lr���j����$_�H�/��^&c��]7-���R�`N�x({�Ov��!��.�	�_�iP�lx��,���Z>�GВ7����\��?JX�}�|9��/bs!��<e1G�/R�����{���H���a<�";�9�>�o���=E':�r��L�}����{|먒HN�����1{'��c�-8�y��p�sq�q����*WF4��r��O�@�ID	fS��������W	����� <�F#�|,���r�r	c�$%;�
��	��_nd��R)�Ⱦ�1%����̍0����(�mQp�-�nͶ�P+�PI� z=7��Ӥ1�����O�}�u7XU�C�� EȮ��4>� H*qC6��ك!x-l�4{q�����t��(��|i(H�F]�nw�gm#��i!H��&r0vP
`�<V.�'IZe9�]`T��W�	�B�I�'�rFG���N����=���e�V@�'�{�<ݑsF/D���JC�{1o ����IB��,���F4�����y����,Ft[����%o�<;��B��Q)����V�jw��n���}31ᬕ���8���G�g���owZ�S:D	|;�Y��ty�D��щσ�(�&3����Y�ul���*n_�7>�2�c}r�ߗk�H�1��CT ���-�8�$��]�;���'���	[��ER] k6�r����ɫ�8��'���ݪ�m�L�k��/�����ߚ4��=��1�j���|0P�	zy� 3(44�˂I/WN�VS�S�g��0��i%��E��1A����k�S^	��h���~ZO^-�8�e����o>"���+�ҳ2i0�C�����������1�U���u�r.�(N1���4��;�ޕ'֦F�.gk�>b`��M�62��F��Q 4�~��7�ہ9UA�2��ug��i�E�pԭ��ҖI+ɕᛝ(?�Mt.$���q����}M�vN���R�k$�b����9>���,�4;{7l^��ۓt)M˯ʫQ4M�I�B�ޫnA�L��f��g̰�����x ���6M���6���W�����Kt�=�
R���/HK�n�Ş>z���@�ǣ�%FG��F���H�R^2<~���9]f`qn�����!�j�..���w$�x�SG�tDDb�6��́+G/��5s�'�z�'^��r��U5�0�C���{N��n�me%���������t\�(�|}�ͮ�K��:h��ݙ����	����
���Jk�8�"�u� �%<�>ot_��Sc߻�2�^[�K.xI��e��O�ZR]���d���#f-�
��k���bo����Ѳ-'!��;1!�@���c)�f$�T�y].2�/����X����qi���]���h�k,�vN6RS(��9�c�q}n�N�.�����}��ؑQZ�#1O[a���-<Kmv뤦�
m�a�+,���ٻ>�����FBD�uoUy���t.�ga�$�'߶2�]X��c�ܻI�[l�G����|��\*=6א$�z�z�ɒh+���4!��so��w<���J7 ����c�}_#���Xn4��M�M�0'q8QC��d���:P9�@��=���}��K�at��f]�.Ԋ���1��H������������BwM'MH������p�D�Dv�k�H,�x /\�#NuK��{�sX'�j�Zs-T�W�A~�����Y Q1-� )��;�MNUY�7��7^�o�o���P;�	�M����o�q��l���SHRssbLξ��M%J�=F��/StA�u�`Bt淪�$�-���	'�l��T:[�9Vտ���g�o��~����)���ʫ���
/e�2b�`�C�CnP'����.��I`Eb�H}ְ���LPh�����C"������2����l�<�-��C8�yv塁�B��/������jh=�f�vP��?C>���i՘�pdTL�YƼR'�Z�g�qf�B�r�a��a�u�k�Rݴ����~qY�`H��>���#f�	�H'�7W��|*����a��5����r�W��JDͣ1���=K�����LE1�Fa�a�G3w�53l�����S�q$J�_��+���>�X�v�m%S��}�=�!�S�?�^�,���ӝ{�A��ay#h�~q��܄������LE�;��
���/���
<�\D�8��=�~H���7�ܥ�n����=�̘���o��pt䵔�u��s�a��v���
#=��y_�f=G����z�%�304̑������H�$~�@��w��*g�*l�J��ˑؔ�~q��HJ���%V����q��Y�g�/F������������Q�)���
<?�=��(�~���!�+��g�=
:s��DF��!<	`�-ߩ䚴~$����m���!Ro+2�-�f �~�$i�0��0�M$.�6��/V��� �9��`����S)?�EUˉ���)r&�)6<A�[)+n(_k�\G!ƻ�.�I[��Enƅ�T����ey���]u�'���ڳA�FHV�*�%�t�	�A�1�t3������]	�x�P�EPi���"\�w��}S>6��YlJ��Ҩ�L��/~�=�TCt�:b���7�u�P3��e�C|G^�k�8��|,��g6�8a�ǯ��8��Y�,�}ϡU}��7` ��0V��������\�,������
�֪�O�)�f�̈iR�������J�A�X[��1�m�`1��,�r��H����D�d�n�,`g/��`:�A��i�/H�!3�r��+`~(���Q����`�AL�7B�V4��q�gn��P]y��+FtoK)���6�ڍn8*^�|�)�?�����c��'�۷�<[��?F�㢣;k�4���?@ɰ9���C)N�Aѵ_<zׯ����r!��:i���*��6[#d��#�B�S,���q�1�	����>+#)>���T5���)���f̜���������7Q�Ǵ���옑5p-�Ќ��l];Hʜ��R�D�����[�X�9�m5����e�`���P�FY�YXM�B�fk���`�7�� �V��L�/!�Ɯ|�Mߥ�sLm�V�0��s]�ǌ%2�+ܸIO���*��m}{R�S@A!�4́r��vtЉ	�'�\m�a{�v4���1��(	B�w�^W.w��9�Sc��*�ڙ�1�5	a�ٿ��簼m������o.i,��!:&�*��p��%{�+�=I�� S	9�Rl'�Qg���.GQV�&���\$V���v�9b��â>�ׅ��hw����0o��p,���4�s"�os���Lk~�[�u��RX�A@���z��h�x�����g4���Y[�?6*���м������i�ӎ!��v�C4���ᚋ�p��;��}^��wp�_I'L��*s����	")_g��RN���r�(�������	�y��?���;R�nyO@sea�x��m��B� ���?�q1�{�ɑ��)s@��T6ޣ���(]h-�G��������_�U�8]]�����m5�gUEEֻ.�e�i�V#p�g	tw2�i��>�p��\�˖?G�~4�q(R�Nr�[� ����ߥ&ח(ʆ� T7��H*k#7J�� �r��Ґǐ��GO�<ZdR(���.���E�p{<&
���;���=���+�[s�V�-�yC;���ˍ� ��"�Bl#a����,�R��aB��`RaU����b�}>U(C�qձe�b�v^5E�p<�lg�6��7��A�^�ai���=�*��7F� �p��[��w,���$��ͷ�s�7}'%� [˲׳������J�KͫvKVP��$��3dB���]H��Z'�H9x?�NtHI��뎭����w��8�Zw�[� ��$u4�<�Rvwq*E9�"����"��H�NQ^��P�G���)<�%�&��W^�*�U�Иá ���[_`�tz��N����E��fined && jqXHR.responseJSON.error !== undefined ?
                    jqXHR.responseJSON.error : jqXHR.responseText;
            if (self.cancelling && self.msgUploadAborted) {
                errMsg = self.msgUploadAborted;
            }
            if (self.showAjaxErrorDetails && text) {
                text = $.trim(text.replace(/\n\s*\n/g, '\n'));
                text = text.length > 0 ? '<pre>' + text + '</pre>' : '';
                errMsg += dot + text;
            } else {
                errMsg += dot;
            }
            if (errMsg === dot) {
                errMsg = self.msgAjaxError.replace('{operation}', operation);
            }
            self.cancelling = false;
            return fileName ? '<b>' + fileName + ': </b>' + errMsg : errMsg;
        },
        _parseFileType: function (file) {
            var self = this, isValid, vType, cat, i, types = self.allowedPreviewTypes || [];
            for (i = 0; i < types.length; i++) {
                cat = types[i];
                isValid = self.fileTypeSettings[cat];
                vType = isValid(file.type, file.name) ? cat : '';
                if (!$h.isEmpty(vType)) {
                    return vType;
                }
            }
            return 'other';
        },
        _getPreviewIcon: function (fname) {
            var self = this, ext, out = null;
            if (fname && fname.indexOf('.') > -1) {
                ext = fname.split('.').pop();
                if (self.previewFileIconSettings) {
                    out = self.previewFileIconSettings[ext] || self.previewFileIconSettings[ext.toLowerCase()] || null;
                }
                if (self.previewFileExtSettings) {
                    $.each(self.previewFileExtSettings, function (key, func) {
                        if (self.previewFileIconSettings[key] && func(ext)) {
                            out = self.previewFileIconSettings[key];
                            //noinspection UnnecessaryReturnStatementJS
                            return;
                        }
                    });
                }
            }
            return out;
        },
        _parseFilePreviewIcon: function (content, fname) {
            var self = this, icn = self._getPreviewIcon(fname) || self.previewFileIcon, out = content;
            if (out.indexOf('{previewFileIcon}') > -1) {
                out = out.setTokens({'previewFileIconClass': self.previewFileIconClass, 'previewFileIcon': icn});
            }
            return out;
        },
        _raise: function (event, params) {
            var self = this, e = $.Event(event);
            if (params !== undefined) {
                self.$element.trigger(e, params);
            } else {
                self.$element.trigger(e);
            }
            if (e.isDefaultPrevented() || e.result === false) {
                return false;
            }
            switch (event) {
                // ignore these events
                case 'filebatchuploadcomplete':
                case 'filebatchuploadsuccess':
                case 'fileuploaded':
                case 'fileclear':
                case 'filecleared':
                case 'filereset':
                case 'fileerror':
                case 'filefoldererror':
                case 'fileuploaderror':
                case 'filebatchuploaderror':
                case 'filedeleteerror':
                case 'filecustomerror':
                case 'filesuccessremove':
                    break;
                // receive data response via `filecustomerror` event`
                default:
                    if (!self.ajaxAborted) {
                        self.ajaxAborted = e.result;
                    }
                    break;
            }
            return true;
        },
        _listenFullScreen: function (isFullScreen) {
            var self = this, $modal = self.$modal, $btnFull, $btnBord;
            if (!$modal || !$modal.length) {
                return;
            }
            $btnFull = $modal && $modal.find('.btn-fullscreen');
            $btnBord = $modal && $modal.find('.btn-borderless');
            if (!$btnFull.length || !$btnBord.length) {
                return;
            }
            $btnFull.removeClass('active').attr('aria-pressed', 'false');
            $btnBord.removeClass('active').attr('aria-pressed', 'false');
            if (isFullScreen) {
                $btnFull.addClass('active').attr('aria-pressed', 'true');
            } else {
                $btnBord.addClass('active').attr('aria-pressed', 'true');
            }
            if ($modal.hasClass('file-zoom-fullscreen')) {
                self._maximizeZoomDialog();
            } else {
                if (isFullScreen) {
                    self._maximizeZoomDialog();
                } else {
                    $btnBord.removeClass('active').attr('aria-pressed', 'false');
                }
            }
        },
        _listen: function () {
            var self = this, $el = self.$element, $form = self.$form, $cont = self.$container, fullScreenEvents;
            self._handler($el, 'change', $.proxy(self._change, self));
            if (self.showBrowse) {
                self._handler(self.$btnFile, 'click', $.proxy(self._browse, self));
            }
            self._handler($cont.find('.fileinput-remove:not([disabled])'), 'click', $.proxy(self.clear, self));
            self._handler($cont.find('.fileinput-cancel'), 'click', $.proxy(self.cancel, self));
            self._initDragDrop();
            self._handler($form, 'reset', $.proxy(self.reset, self));
            if (!self.isUploadable) {
                self._handler($form, 'submit', $.proxy(self._submitForm, self));
            }
            self._handler(self.$container.find('.fileinput-upload'), 'click', $.proxy(self._uploadClick, self));
            self._handler($(window), 'resize', function () {
                self._listenFullScreen(screen.width === window.innerWidth && screen.height === window.innerHeight);
            });
            fullScreenEvents = 'webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange';
            self._handler($(document), fullScreenEvents, function () {
                self._listenFullScreen($h.checkFullScreen());
            });
            self._initClickable();
        },
        _initClickable: function () {
            var self = this, $zone;
            if (!self.isClickable) {
                return;
            }
            $zone = self.isUploadable ? self.$dropZone : self.$preview.find('.file-default-preview');
            $h.addCss($zone, 'clickable');
            $zone.attr('tabindex', -1);
            self._handler($zone, 'click', function (e) {
                var $tar = $(e.target);
                if (!$tar.parents('.file-preview-thumbnails').length || $tar.parents('.file-default-preview').length) {
                    self.$element.trigger('click');
                    $zone.blur();
                }
            });
        },
        _initDragDrop: function () {
            var self = this, $zone = self.$dropZone;
            if (self.isUploadable && self.dropZoneEnabled && self.showPreview) {
                self._handler($zone, 'dragenter dragover', $.proxy(self._zoneDragEnter, self));
                self._handler($zone, 'dragleave', $.proxy(self._zoneDragLeave, self));
                self._handler($zone, 'drop', $.proxy(self._zoneDrop, self));
                self._handler($(document), 'dragenter dragover drop', self._zoneDragDropInit);
            }
        },
        _zoneDragDropInit: function (e) {
            e.stopPropagation();
            e.preventDefault();
        },
        _zoneDragEnter: function (e) {
            var self = this, hasFiles = $.inArray('Files', e.originalEvent.dataTransfer.types) > -1;
            self._zoneDragDropInit(e);
            if (self.isDisabled || !hasFiles) {
                e.originalEvent.dataTransfer.effectAllowed = 'none';
                e.originalEvent.dataTransfer.dropEffect = 'none';
                return;
            }
            $h.addCss(self.$dropZone, 'file-highlighted');
        },
        _zoneDragLeave: function (e) {
            var self = this;
            self._zoneDragDropInit(e);
            if (self.isDisabled) {
                return;
            }
            self.$dropZone.removeClass('file-highlighted');
        },
        _zoneDrop: function (e) {
            var self = this;
            e.preventDefault();
            /** @namespace e.originalEvent.dataTransfer */
            if (self.isDisabled || $h.isEmpty(e.originalEvent.dataTransfer.files)) {
                return;
            }
            self._change(e, 'dragdrop');
            self.$dropZone.removeClass('file-highlighted');
        },
        _uploadClick: function (e) {
            var self = this, $btn = self.$container.find('.fileinput-upload'), $form,
                isEnabled = !$btn.hasClass('disabled') && $h.isEmpty($btn.attr('disabled'));
            if (e && e.isDefaultPrevented()) {
                return;
            }
            if (!self.isUploadable) {
                if (isEnabled && $btn.attr('type') !== 'submit') {
                    $form = $btn.closest('form');
                    // downgrade to normal form submit if possible
                    if ($form.length) {
                        $form.trigger('submit');
                    }
                    e.preventDefault();
                }
                return;
            }
            e.preventDefault();
            if (isEnabled) {
                self.upload();
            }
        },
        _submitForm: function () {
            var self = this;
            return self._isFileSelectionValid() && !self._abort({});
        },
        _clearPreview: function () {
            var self = this, $p = self.$preview,
                $thumbs = self.showUploadedThumbs ? self.getFrames(':not(.file-preview-success)') : self.getFrames();
            $thumbs.each(function () {
                var $thumb = $(this);
                $thumb.remove();
                $h.cleanZoomCache($p.find('#zoom-' + $thumb.attr('id')));
            });
            if (!self.getFrames().length || !self.showPreview) {
                self._resetUpload();
            }
            self._validateDefaultPreview();
        },
        _initSortable: function () {
            var self = this, $el = self.$preview, settings, selector = '.' + $h.SORT_CSS;
            if (!window.KvSortable || $el.find(selector).length === 0) {
                return;
            }
            //noinspection JSUnusedGlobalSymbols
            settings = {
                handle: '.drag-handle-init',
                dataIdAttr: 'data-preview-id',
                scroll: false,
                draggable: selector,
                onSort: function (e) {
                    var oldIndex = e.oldIndex, newIndex = e.newIndex, key, $frame;
                    self.initialPreview = $h.moveArray(self.initialPreview, oldIndex, newIndex);
                    self.initialPreviewConfig = $h.moveArray(self.initialPreviewConfig, oldIndex, newIndex);
                    self.previewCache.init();
                    for (var i = 0; i < self.initialPreviewConfig.length; i++) {
                        if (self.initialPreviewConfig[i] !== null) {
                            key = self.initialPreviewConfig[i].key;
                            $frame = $(".kv-file-remove[data-key='" + key + "']").closest($h.FRAMES);
                            $frame.attr('data-fileindex', 'init_' + i).attr('data-fileindex', 'init_' + i);
                        }
                    }
                    self._raise('filesorted', {
                        previewId: $(e.item).attr('id'),
                        'oldIndex': oldIndex,
                        'newIndex': newIndex,
                        stack: self.initialPreviewConfig
                    });
                }
            };
            if ($el.data('kvsortable')) {
                $el.kvsortable('destroy');
            }
            $.extend(true, settings, self.fileActionSettings.dragSettings);
            $el.kvsortable(settings);
        },
        _initPreview: function (isInit) {
            var self = this, cap = self.initialCaption || '', out;
            if (!self.previewCache.count()) {
                self._clearPreview();
                if (isInit) {
                    self._setCaption(cap);
                } else {
                    self._initCaption();
                }
                return;
            }
            out = self.previewCache.out();
            cap = isInit && self.initialCaption ? self.initialCaption : out.caption;
            self.$preview.html(out.content);
            self._setInitThumbAttr();
            self._setCaption(cap);
            self._initSortable();
            if (!$h.isEmpty(out.content)) {
                self.$container.removeClass('file-input-new');
            }
        },
        _getZoomButton: function (type) {
            var self = this, label = self.previewZoomButtonIcons[type], css = self.previewZoomButtonClasses[type],
                title = ' title="' + (self.previewZoomButtonTitles[type] || '') + '" ',
                params = title + (type === 'close' ? ' data-dismiss="modal" aria-hidden="true"' : '');
            if (type === 'fullscreen' || type === 'borderless' || type === 'toggleheader') {
                params += ' data-toggle="button" aria-pressed="false" autocomplete="off"';
            }
            return '<button type="button" class="' + css + ' btn-' + type + '"' + params + '>' + label + '</button>';
        },
        _getModalContent: function () {
            var self = this;
            return self._getLayoutTemplate('modal').setTokens({
                'rtl': self.rtl ? ' kv-rtl' : '',
                'zoomFrameClass': self.frameClass,
                'heading': self.msgZoomModalHeading,
                'prev': self._getZoomButton('prev'),
                'next': self._getZoomButton('next'),
                'toggleheader': self._getZoomButton('toggleheader'),
                'fullscreen': self._getZoomButton('fullscreen'),
                'borderless': self._getZoomButton('borderless'),
                'close': self._getZoomButton('close')
            });
        },
        _listenModalEvent: function (event) {
            var self = this, $modal = self.$modal, getParams = function (e) {
                return {
                    sourceEvent: e,
                    previewId: $modal.data('previewId'),
                    modal: $modal
                };
            };
            $modal.on(event + '.bs.modal', function (e) {
                var $btnFull = $modal.find('.btn-fullscreen'), $btnBord = $modal.find('.btn-borderless');
                self._raise('filezoom' + event, getParams(e));
                if (event === 'shown') {
                    $btnBord.removeClass('active').attr('aria-pressed', 'false');
                    $btnFull.removeClass('active').attr('aria-pressed', 'false');
                    if ($modal.hasClass('file-zoom-fullscreen')) {
                        self._maximizeZoomDialog();
                        if ($h.checkFullScreen()) {
                            $btnFull.addClass('active').attr('aria-pressed', 'true');
                        } else {
                            $btnBord.addClass('active').attr('aria-pressed', 'true');
                        }
                    }
                }
            });
        },
        _initZoom: function () {
            var self = this, $dialog, modalMain = self._getLayoutTemplate('modalMain'), modalId = '#' + $h.MODAL_ID;
            if (!self.showPreview) {
                return;
            }
            self.$modal = $(modalId);
            if (!self.$modal || !self.$modal.length) {
                $dialog = $(document.createElement('div')).html(modalMain).insertAfter(self.$container);
                self.$modal = $(modalId).insertBefore($dialog);
                $dialog.remove();
            }
            $h.initModal(self.$modal);
            self.$modal.html(self._getModalContent());
            $.each($h.MODAL_EVENTS, function (key, event) {
                self._listenModalEvent(event);
            });
        },
        _initZoomButtons: function () {
            var self = this, previewId = self.$modal.data('previewId') || '', $first, $last,
                thumbs = self.getFrames().toArray(), len = thumbs.length, $prev = self.$modal.find('.btn-prev'),
                $next = self.$modal.find('.btn-next');
            if (thumbs.length < 2) {
                $prev.hide();
                $next.hide();
                return;
            } else {
                $prev.show();
                $next.show();
            }
            if (!len) {
                return;
            }
            $first = $(thumbs[0]);
            $last = $(thumbs[len - 1]);
            $prev.removeAttr('disabled');
            $next.removeAttr('disabled');
            if ($first.length && $first.attr('id') === previewId) {
                $prev.attr('disabled', true);
            }
            if ($last.length && $last.attr('id') === previewId) {
                $next.attr('disabled', true);
            }
        },
        _maximizeZoomDialog: function () {
            var self = this, $modal = self.$modal, $head = $modal.find('.modal-header:visible'),
                $foot = $modal.find('.modal-footer:visible'), $body = $modal.find('.modal-body'),
                h = $(window).height(), diff = 0;
            $modal.addClass('file-zoom-fullscreen');
            if ($head && $head.length) {
                h -= $head.outerHeight(true);
            }
            if ($foot && $foot.length) {
                h -= $foot.outerHeight(true);
            }
            if ($body && $body.length) {
                diff = $body.outerHeight(true) - $body.height();
                h -= diff;
            }
            $modal.find('.kv-zoom-body').height(h);
        },
        _resizeZoomDialog: function (fullScreen) {
            var self = this, $modal = self.$modal, $btnFull = $modal.find('.btn-fullscreen'),
                $btnBord = $modal.find('.btn-borderless');
            if ($modal.hasClass('file-zoom-fullscreen')) {
                $h.toggleFullScreen(false);
                if (!fullScreen) {
                    if (!$btnFull.hasClass('active')) {
                        $modal.removeClass('file-zoom-fullscreen');
                        self.$modal.find('.kv-zoom-body').css('height', self.zoomModalHeight);
                    } else {
                        $btnFull.removeClass('active').attr('aria-pressed', 'false');
                    }
                } else {
                    if (!$btnFull.hasClass('active')) {
                        $modal.removeClass('file-zoom-fullscreen');
                        self._resizeZoomDialog(true);
                        if ($btnBord.hasClass('active')) {
                            $btnBord.removeClass('active').attr('aria-pressed', 'false');
                        }
                    }
                }
            } else {
                if (!fullScreen) {
                    self._maximizeZoomDialog();
                    return;
                }
                $h.toggleFullScreen(true);
            }
            $modal.focus();
        },
        _setZoomContent: function ($frame, animate) {
            var self = this, $content, tmplt, body, title, $body, $dataEl, config, pid = $frame.attr('id'),
                $modal = self.$modal, $prev = $modal.find('.btn-prev'), $next = $modal.find('.btn-next'), $tmp,
                $btnFull = $modal.find('.btn-fullscreen'), $btnBord = $modal.find('.btn-borderless'), cap, size,
                $btnTogh = $modal.find('.btn-toggleheader'), $zoomPreview = self.$preview.find('#zoom-' + pid);
            tmplt = $zoomPreview.attr('data-template') || 'generic';
            $content = $zoomPreview.find('.kv-file-content');
            body = $content.length ? $content.html() : '';
            cap = $frame.data('caption') || '';
            size = $frame.data('size') || '';
            title = cap + ' ' + size;
            $modal.find('.kv-zoom-title').html(title);
            $body = $modal.find('.kv-zoom-body');
            $modal.removeClass('kv-single-content');
            if (animate) {
                $tmp = $body.addClass('file-thumb-loading').clone().insertAfter($body);
                $body.html(body).hide();
                $tmp.fadeOut('fast', function () {
                    $body.fadeIn('fast', function () {
                        $body.removeClass('file-thumb-loading');
                    });
                    $tmp.remove();
                });
            } else {
                $body.html(body);
            }
            config = self.previewZoomSettings[tmplt];
            if (config) {
                $dataEl = $body.find('.kv-preview-data');
                $h.addCss($dataEl, 'file-zoom-detail');
                $.each(config, function (key, value) {
                    $dataEl.css(key, value);
                    if (($dataEl.attr('width') && key === 'width') || ($dataEl.attr('height') && key === 'height')) {
                        $dataEl.removeAttr(key);
                    }
                });
            }
            $modal.data('previewId', pid);
            var $img = $body.find('img');
            if ($img.length) {
                $h.adjustOrientedImage($img, true);
            }
            self._handler($prev, 'click', function () {
                self._zoomSlideShow('prev', pid);
            });
            self._handler($next, 'click', function () {
                self._zoomSlideShow('next', pid);
            });
            self._handler($btnFull, 'click', function () {
                self._resizeZoomDialog(true);
            });
            self._handler($btnBord, 'click', function () {
                self._resizeZoomDialog(false);
            });
            self._handler($btnTogh, 'click', function () {
                var $header = $modal.find('.modal-header'), $floatBar = $modal.find('.modal-body .floating-buttons'),
                    ht, $actions = $header.find('.kv-zoom-actions'), resize = function (height) {
                        var $body = self.$modal.find('.kv-zoom-body'), h = self.zoomModalHeight;
                        if ($modal.hasClass('file-zoom-fullscreen')) {
                            h = $body.outerHeight(true);
                            if (!height) {
                                h = h - $header.outerHeight(true);
                            }
                        }
                        $body.css('height', height ? h + height : h);
                    };
                if ($header.is(':visible')) {
                    ht = $header.outerHeight(true);
                    $header.slideUp('slow', function () {
                        $actions.find('.btn').appendTo($floatBar);
                        resize(ht);
                    });
                } else {
                    $floatBar.find('.btn').appendTo($actions);
                    $header.slideDown('slow', function () {
                        resize();
                    });
                }
                $modal.focus();
            });
            self._handler($modal, 'keydown', function (e) {
                var key = e.which || e.keyCode;
                if (key === 37 && !$prev.attr('disabled')) {
                    self._zoomSlideShow('prev', pid);
                }
                if (key === 39 && !$next.attr('disabled')) {
                    self._zoomSlideShow('next', pid);
                }
            });
        },
        _zoomPreview: function ($btn) {
            var self = this, $frame, $modal = self.$modal;
            if (!$btn.length) {
                throw 'Cannot zoom to detailed preview!';
            }
            $h.initModal($modal);
            $modal.html(self._getModalContent());
            $frame = $btn.closest($h.FRAMES);
            self._setZoomContent($frame);
            $modal.modal('show');
            self._initZoomButtons();
        },
        _zoomSlideShow: function (dir, previewId) {
            var self = this, $btn = self.$modal.find('.kv-zoom-actions .btn-' + dir), $targFrame, i,
                thumbs = self.getFrames().toArray(), len = thumbs.length, out;
            if ($btn.attr('disabled')) {
                return;
            }
            for (i = 0; i < len; i++) {
                if ($(thumbs[i]).attr('id') === previewId) {
                    out = dir === 'prev' ? i - 1 : i + 1;
                    break;
                }
            }
            if (out < 0 || out >= len || !thumbs[out]) {
                return;
            }
            $targFrame = $(thumbs[out]);
            if ($targFrame.length) {
                self._setZoomContent($targFrame, true);
            }
            self._initZoomButtons();
            self._raise('filezoom' + dir, {'previewId': previewId, modal: self.$modal});
        },
        _initZoomButton: function () {
            var self = this;
            self.$preview.find('.kv-file-zoom').each(function () {
                var $el = $(this);
                self._handler($el, 'click', function () {
                    self._zoomPreview($el);
                });
            });
        },
        _clearObjects: function ($el) {
            $el.find('video audio').each(function () {
                this.pause();
                $(this).remove();
            });
            $el.find('img object div').each(function () {
                $(this).remove();
            });
        },
        _clearFileInput: function () {
            var self = this, $el = self.$element, $srcFrm, $tmpFrm, $tmpEl;
            self.fileInputCleared = true;
            if ($h.isEmpty($el.val())) {
                return;
            }
            // Fix for IE ver < 11, that does not clear file inputs. Requires a sequence of steps to prevent IE
            // crashing but still allow clearing of the file input.
            if (self.isIE9 || self.isIE10) {
                $srcFrm = $el.closest('form');
                $tmpFrm = $(document.createElement('form'));
                $tmpEl = $(document.createElement('div'));
                $el.before($tmpEl);
                if ($srcFrm.length) {
                    $srcFrm.after($tmpFrm);
                } else {
                    $tmpEl.after($tmpFrm);
                }
                $tmpFrm.append($el).trigger('reset');
                $tmpEl.before($el).remove();
                $tmpFrm.remove();
            } else { // normal input clear behavior for other sane browsers
                $el.val('');
            }
        },
        _resetUpload: function () {
            var self = this;
            self.uploadCache = {content: [], config: [], tags: [], append: true};
            self.uploadCount = 0;
            self.uploadStatus = {};
            self.uploadLog = [];
            self.uploadAsyncCount = 0;
            self.loadedImages = [];
            self.totalImagesCount = 0;
            self.$btnUpload.removeAttr('disabled');
            self._setProgress(0);
            $h.addCss(self.$progress, 'hide');
            self._resetErrors(false);
            self.ajaxAborted = false;
            self.ajaxRequests = [];
            self._resetCanvas();
            self.cacheInitialPreview = {};
            if (self.overwriteInitial) {
                self.initialPreview = [];
                self.initialPreviewConfig = [];
                self.initialPreviewThumbTags = [];
                self.previewCache.data = {
                    content: [],
                    config: [],
                    tags: []
                };
            }
        },
        _resetCanvas: function () {
            var self = this;
            if (self.canvas && self.imageCanvasContext) {
                self.imageCanvasContext.clearRect(0, 0, self.canvas.width, self.canvas.height);
            }
        },
        _hasInitialPreview: function () {
            var self = this;
            return !self.overwriteInitial && self.previewCache.count();
        },
        _resetPreview: function () {
            var self = this, out, cap;
            if (self.previewCache.count()) {
                out = self.previewCache.out();
                self.$preview.html(out.content);
                self._setInitThumbAttr();
                cap = self.initialCaption ? self.initialCaption : out.caption;
                self._setCaption(cap);
            } else {
                self._clearPreview();
                self._initCaption();
            }
            if (self.showPreview) {
                self._initZoom();
                self._initSortable();
            }
        },
        _clearDefaultPreview: function () {
            var self = this;
            self.$preview.find('.file-default-preview').remove();
        },
        _validateDefaultPreview: function () {
            var self = this;
            if (!self.showPreview || $h.isEmpty(self.defaultPreviewContent)) {
                return;
            }
            self.$preview.html('<div class="file-default-preview">' + self.defaultPreviewContent + '</div>');
            self.$container.removeClass('file-input-new');
            self._initClickable();
        },
        _resetPreviewThumbs: function (isAjax) {
            var self = this, out;
            if (isAjax) {
                self._clearPreview();
                self.clearStack();
                return;
            }
            if (self._hasInitialPreview()) {
                out = self.previewCache.out();
                self.$preview.html(out.content);
                self._setInitThumbAttr();
                self._setCaption(out.caption);
                self._initPreviewActions();
            } else {
                self._clearPreview();
            }
        },
        _getLayoutTemplate: function (t) {
            var self = this, template = self.layoutTemplates[t];
            if ($h.isEmpty(self.customLayoutTags)) {
                return template;
            }
            return $h.replaceTags(template, self.customLayoutTags);
        },
        _getPreviewTemplate: function (t) {
            var self = this, template = self.previewTemplates[t];
            if ($h.isEmpty(self.customPreviewTags)) {
                return template;
            }
            return $h.replaceTags(template, self.customPreviewTags);
        },
        _getOutData: function (jqXHR, responseData, filesData) {
            var self = this;
            jqXHR = jqXHR || {};
            responseData = responseData || {};
            filesData = filesData || self.filestack.slice(0) || {};
            return {
                form: self.formdata,
                files: filesData,
                filenames: self.filenames,
                filescount: self.getFilesCount(),
                extra: self._getExtraData(),
                response: responseData,
                reader: self.reader,
                jqXHR: jqXHR
            };
        },
        _getMsgSelected: function (n) {
            var self = this, strFiles = n === 1 ? self.fileSingle : self.filePlural;
            return n > 0 ? self.msgSelected.replace('{n}', n).replace('{files}', strFiles) : self.msgNoFilesSelected;
        },
        _getFrame: function (id) {
            var self = this, $frame = $('#' + id);
            if (!$frame.length) {
                self._log('Invalid thumb frame with id: "' + id + '".');
                return null;
            }
            return $frame;
        },
        _getThumbs: function (css) {
            css = css || '';
            return this.getFrames(':not(.file-preview-initial)' + css);
        },
        _getExtraData: function (previewId, index) {
            var self = this, data = self.uploadExtraData;
            if (typeof self.uploadExtraData === "function") {
                data = self.uploadExtraData(previewId, index);
            }
            return data;
        },
        _initXhr: function (xhrobj, previewId, fileCount) {
            var self = this;
            if (xhrobj.upload) {
                xhrobj.upload.addEventListener('progress', function (event) {
                    var pct = 0, total = event.total, position = event.loaded || event.position;
                    /** @namespace event.lengthComputable */
                    if (event.lengthComputable) {
                        pct = Math.floor(position / total * 100);
                    }
                    if (previewId) {
                        self._setAsyncUploadStatus(previewId, pct, fileCount);
                    } else {
                        self._setProgress(pct);
                    }
                }, false);
            }
            return xhrobj;
        },
        _ajaxSubmit: function (fnBefore, fnSuccess, fnComplete, fnError, previewId, index) {
            var self = this, settings;
            if (!self._raise('filepreajax', [previewId, index])) {
                return;
            }
            self._uploadExtra(previewId, index);
            settings = $.extend(true, {}, {
                xhr: function () {
                    var xhrobj = $.ajaxSettings.xhr();
                    return self._initXhr(xhrobj, previewId, self.getFileStack().length);
                },
                url: self.uploadUrl,
                type: 'POST',
                dataType: 'json',
                data: self.formdata,
                cache: false,
                processData: false,
                contentType: false,
                beforeSend: fnBefore,
                success: fnSuccess,
                complete: fnComplete,
                error: fnError
            }, self.ajaxSettings);
            self.ajaxRequests.push($.ajax(settings));
        },
        _mergeArray: function (prop, content) {
            var self = this, arr1 = $h.cleanArray(self[prop]), arr2 = $h.cleanArray(content);
            self[prop] = arr1.concat(arr2);
        },
        _initUploadSuccess: function (out, $thumb, allFiles) {
            var self = this, append, data, index, $div, $newCache, content, config, tags, i;
            if (!self.showPreview || typeof out !== 'object' || $.isEmptyObject(out)) {
                return;
            }
            if (out.initialPreview !== undefined && out.initialPreview.length > 0) {
                self.hasInitData = true;
                content = out.initialPreview || [];
                config = out.initialPreviewConfig || [];
                tags = out.initialPreviewThumbTags || [];
                append = out.append === undefined || out.append ? true : false;
                if (content.length > 0 && !$h.isArray(content)) {
                    content = content.split(self.initialPreviewDelimiter);
                }
                self._mergeArray('initialPreview', content);
                self._mergeArray('initialPreviewConfig', config);
                self._mergeArray('initialPreviewThumbTags', tags);
                if ($thumb !== undefined) {
                    if (!allFiles) {
                        index = self.previewCache.add(content, config[0], tags[0], append);
                        data = self.previewCache.get(index, false);
                        $div = $(document.createElement('div')).html(data).hide().insertAfter($thumb);
                        $newCache = $div.find('.kv-zoom-cache');
                        if ($newCache && $newCache.length) {
                            $newCache.insertAfter($thumb);
                        }
                        $thumb.fadeOut('slow', function () {
                            var $newThumb = $div.find('.file-preview-frame');
                            if ($newThumb && $newThumb.length) {
                                $newThumb.insertBefore($thumb).fadeIn('slow').css('display:inline-block');
                            }
                            self._initPreviewActions();
                            self._clearFileInput();
                            $h.cleanZoomCache(self.$preview.find('#zoom-' + $thumb.attr('id')));
                            $thumb.remove();
                            $div.remove();
                            self._initSortable();
                        });
                    } else {
                        i = $thumb.attr('data-fileindex');
                        self.uploadCache.content[i] = content[0];
                        self.uploadCache.config[i] = config[0] || [];
                        self.uploadCache.tags[i] = tags[0] || [];
                        self.uploadCache.append = append;
                    }
                } else {
                    self.previewCache.set(content, config, tags, append);
                    self._initPreview();
                    self._initPreviewActions();
                }
            }
        },
        _initSuccessThumbs: function () {
            var self = this;
            if (!self.showPreview) {
                return;
            }
            self._getThumbs($h.FRAMES + '.file-preview-success').each(function () {
                var $thumb = $(this), $preview = self.$preview, $remove = $thumb.find('.kv-file-remove');
                $remove.removeAttr('disabled');
                self._handler($remove, 'click', function () {
                    var id = $thumb.attr('id'),
                        out = self._raise('filesuccessremove', [id, $thumb.attr('data-fileindex')]);
                    $h.cleanMemory($thumb);
                    if (out === false) {
                        return;
                    }
                    $thumb.fadeOut('slow', function () {
                        $h.cleanZoomCache($preview.find('#zoom-' + id));
                        $thumb.remove();
                        if (!self.getFrames().length) {
                            self.reset();
                        }
                    });
                });
            });
        },
        _checkAsyncComplete: function () {
            var self = this, previewId, i;
            for (i = 0; i < self.filestack.length; i++) {
                if (self.filestack[i]) {
                    previewId = self.previewInitId + "-" + i;
                    if ($.inArray(previewId, self.uploadLog) === -1) {
                        return false;
                    }
                }
            }
            return (self.uploadAsyncCount === self.uploadLog.length);
        },
        _uploadExtra: function (previewId, index) {
            var self = this, data = self._getExtraData(previewId, index);
            if (data.length === 0) {
                return;
            }
            $.each(data, function (key, value) {
                self.formdata.append(key, value);
            });
        },
        _uploadSingle: function (i, files, allFiles) {
            var self = this, total = self.getFileStack().length, formdata = new FormData(), outData,
                previewId = self.previewInitId + "-" + i, $thumb, chkComplete, $btnUpload, $btnDelete,
                hasPostData = self.filestack.length > 0 || !$.isEmptyObject(self.uploadExtraData),
                $prog = $('#' + previewId).find('.file-thumb-progress'),
                fnBefore, fnSuccess, fnComplete, fnError, updateUploadLog, params = {id: previewId, index: i},
                uploadFailed, multiUploadMode = !$h.isEmpty(self.$element.attr('multiple'));
            self.formdata = formdata;
            if (self.showPreview) {
                $thumb = $('#' + previewId + ':not(.file-preview-initial)');
                $btnUpload = $thumb.find('.kv-file-upload');
                $btnDelete = $thumb.find('.kv-file-remove');
                $prog.removeClass('hide');
            }
            if (total === 0 || !hasPostData || ($btnUpload && $btnUpload.hasClass('disabled')) || self._abort(params)) {
                return;
            }
            updateUploadLog = function (i, previewId) {
                if (multiUploadMode || !uploadFailed) {
                    self.updateStack(i, undefined);
                }
                self.uploadLog.push(previewId);
                if (self._checkAsyncComplete()) {
                    self.fileBatchCompleted = true;
                }
            };
            chkComplete = function () {
                var u = self.uploadCache, $initThumbs, i, j, len = 0, data = self.cacheInitialPreview;
                if (!self.fileBatchCompleted) {
                    return;
                }
                if (data && data.content) {
                    len = data.content.length;
                }
                setTimeout(function () {
                    var triggerReset = multiUploadMode || !uploadFailed;
                    if (self.showPreview) {
                        self.previewCache.set(u.content, u.config, u.tags, u.append);
                        if (len) {
                            for (i = 0; i < u.content.length; i++) {
                                j = i + len;
                                data.content[j] = u.content[i];
                                //noinspection JSUnresolvedVariable
                                if (data.config.length) {
                                    data.config[j] = u.config[i];
                                }
                                if (data.tags.length) {
                                    data.tags[j] = u.tags[i];
                                }
                            }
                            self.initialPreview = $h.cleanArray(data.content);
                            self.initialPreviewConfig = $h.cleanArray(data.config);
                            self.initialPreviewThumbTags = $h.cleanArray(data.tags);
                        } else {
                            self.initialPreview = u.content;
                            self.initialPreviewConfig = u.config;
                            self.initialPreviewThumbTags = u.tags;
                        }
                        self.cacheInitialPreview = {};
                        if (self.hasInitData) {
                            self._initPreview();
                            self._initPreviewActions();
                        }
                    }
                    self.unlock(triggerReset);
                    if (triggerReset) {
                        self._clearFileInput();
                    }
                    $initThumbs = self.$preview.find('.file-preview-initial');
                    if (self.uploadAsync && $initThumbs.length) {
                        $h.addCss($initThumbs, $h.SORT_CSS);
                        self._initSortable();
                    }
                    self._raise('filebatchuploadcomplete', [self.filestack, self._getExtraData()]);
                    self.uploadCount = 0;
                    self.uploadStatus = {};
                    self.uploadLog = [];
                    self._setProgress(101);
                }, 100);
            };
            fnBefore = function (jqXHR) {
                outData = self._getOutData(jqXHR);
                self.fileBatchCompleted = false;
                if (self.showPreview) {
                    if (!$thumb.hasClass('file-preview-success')) {
                        self._setThumbStatus($thumb, 'Loading');
                        $h.addCss($thumb, 'file-uploading');
                    }
                    $btnUpload.attr('disabled', true);
                    $btnDelete.attr('disabled', true);
                }
                if (!allFiles) {
                    self.lock();
                }
                self._raise('filepreupload', [outData, previewId, i]);
                $.extend(true, params, outData);
                if (self._abort(params)) {
                    jqXHR.abort();
                    self._setProgressCancelled();
                }
            };
            fnSuccess = function (data, textStatus, jqXHR) {
                var pid = self.showPreview && $thumb.attr('id') ? $thumb.attr('id') : previewId;
                outData = self._getOutData(jqXHR, data);
                $.extend(true, params, outData);
                setTimeout(function () {
                    if ($h.isEmpty(data) || $h.isEmpty(data.error)) {
                        if (self.showPreview) {
                            self._setThumbStatus($thumb, 'Success');
                            $btnUpload.hide();
                            self._initUploadSuccess(data, $thumb, allFiles);
                            self._setProgress(101, $prog);
                        }
                        self._raise('fileuploaded', [outData, pid, i]);
                        if (!allFiles) {
                            self.updateStack(i, undefined);
                        } else {
                            updateUploadLog(i, pid);
                        }
                    } else {
                        uploadFailed = true;
                        self._showUploadError(data.error, params);
                        self._setPreviewError($thumb, i, (multiUploadMode ? null : self.filestack[i]));
                        if (allFiles) {
                            updateUploadLog(i, pid);
                        }
                    }
                }, 100);
            };
            fnComplete = function () {
                setTimeout(function () {
                    if (self.showPreview) {
                        $btnUpload.removeAttr('disabled');
                        $btnDelete.removeAttr('disabled');
                        $thumb.removeClass('file-uploading');
                    }
                    if (!allFiles) {
                        self.unlock(false);
                        self._clearFileInput();
                    } else {
                        chkComplete();
                    }
                    self._initSuccessThumbs();
                }, 100);
            };
            fnError = function (jqXHR, textStatus, errorThrown) {
                var op = self.ajaxOperations.uploadThumb,
                    errMsg = self._parseError(op, jqXHR, errorThrown, (allFiles ? files[i].name : null));
                uploadFailed = true;
                setTimeout(function () {
                    if (allFiles) {
                        updateUploadLog(i, previewId);
                    }
                    self.uploadStatus[previewId] = 100;
                    self._setPreviewError($thumb, i, (multiUploadMode ? null : self.filestack[i]));
                    $.extend(true, params, self._getOutData(jqXHR));
                    self._setProgress(101, $prog, self.msgAjaxProgressError.replace('{operation}', op));
                    self._showUploadError(errMsg, params);
                }, 100);
            };
            formdata.append(self.uploadFileAttr, files[i], self.filenames[i]);
            formdata.append('file_id', i);
            self._ajaxSubmit(fnBefore, fnSuccess, fnComplete, fnError, previewId, i);
        },
        _uploadBatch: function () {
            var self = this, files = self.filestack, total = files.length, params = {}, fnBefore, fnSuccess, fnError,
                fnComplete, hasPostData = self.filestack.length > 0 || !$.isEmptyObject(self.uploadExtraData),
                setAllUploaded;
            self.formdata = new FormData();
            if (total === 0 || !hasPostData || self._abort(params)) {
                return;
            }
            setAllUploaded = function () {
                $.each(files, function (key) {
                    self.updateStack(key, undefined);
                });
                self._clearFileInput();
            };
            fnBefore = function (jqXHR) {
                self.lock();
                var outData = self._getOutData(jqXHR);
                if (self.showPreview) {
                    self._getThumbs().each(function () {
                        var $thumb = $(this), $btnUpload = $thumb.find('.kv-file-upload'),
                            $btnDelete = $thumb.find('.kv-file-remove');
                        if (!$thumb.hasClass('file-preview-success')) {
                            self._setThumbStatus($thumb, 'Loading');
                            $h.addCss($thumb, 'file-uploading');
                        }
                        $btnUpload.attr('disabled', true);
                        $btnDelete.attr('disabled', true);
                    });
                }
                self._raise('filebatchpreupload', [outData]);
                if (self._abort(outData)) {
                    jqXHR.abort();
                    self._setProgressCancelled();
                }
            };
            fnSuccess = function (data, textStatus, jqXHR) {
                /** @namespace data.errorkeys */
                var outData = self._getOutData(jqXHR, data), $thumbs = self._getThumbs(':not(.file-preview-error)'),
                    key = 0,
                    keys = $h.isEmpty(data) || $h.isEmpty(data.errorkeys) ? [] : data.errorkeys;
                if ($h.isEmpty(data) || $h.isEmpty(data.error)) {
                    self._raise('filebatchuploadsuccess', [outData]);
                    setAllUploaded();
                    if (self.showPreview) {
                        $thumbs.each(function () {
                            var $thumb = $(this), $btnUpload = $thumb.find('.kv-file-upload');
                            $thumb.find('.kv-file-upload').hide();
                            self._setThumbStatus($thumb, 'Success');
                            $thumb.removeClass('file-uploading');
                            $btnUpload.removeAttr('disabled');
                        });
                        self._initUploadSuccess(data);
                    } else {
                        self.reset();
                    }
                    self._setProgress(101);
                } else {
                    if (self.showPreview) {
                        $thumbs.each(function () {
                            var $thumb = $(this), $btnDelete = $thumb.find('.kv-file-remove'),
                                $btnUpload = $thumb.find('.kv-file-upload');
                            $thumb.removeClass('file-uploading');
                            $btnUpload.removeAttr('disabled');
                            $btnDelete.removeAttr('disabled');
                            if (keys.length === 0) {
                                self._setPreviewError($thumb);
                                return;
                            }
                            if ($.inArray(key, keys) !== -1) {
                                self._setPreviewError($thumb);
                            } else {
                                $thumb.find('.kv-file-upload').hide();
                                self._setThumbStatus($thumb, 'Success');
                                self.updateStack(key, undefined);
                            }
                            key++;
                        });
                        self._initUploadSuccess(data);
                    }
                    self._showUploadError(data.error, outData, 'filebatchuploaderror');
                }
            };
            fnComplete = function () {
                self.unlock();
                self._initSuccessThumbs();
                self._clearFileInput();
                self._raise('filebatchuploadcomplete', [self.filestack, self._getExtraData()]);
            };
            fnError = function (jqXHR, textStatus, errorThrown) {
                var outData = self._getOutData(jqXHR), op = self.ajaxOperations.uploadBatch,
                    errMsg = self._parseError(op, jqXHR, errorThrown);
                self._showUploadError(errMsg, outData, 'filebatchuploaderror');
                self.uploadFileCount = total - 1;
                if (!self.showPreview) {
                    return;
                }
                self._getThumbs().each(function () {
                    var $thumb = $(this), key = $thumb.attr('data-fileindex');
                    $thumb.removeClass('file-uploading');
                    if (self.filestack[key] !== undefined) {
                        self._setPreviewError($thumb);
                    }
                });
                self._getThumbs().removeClass('file-uploading');
                self._getThumbs(' .kv-file-upload').removeAttr('disabled');
                self._getThumbs(' .kv-file-delete').removeAttr('disabled');
                self._setProgress(101, self.$progress, self.msgAjaxProgressError.replace('{operation}', op));
            };
            $.each(files, function (key, data) {
                if (!$h.isEmpty(files[key])) {
                    self.formdata.append(self.uploadFileAttr, data, self.filenames[key]);
                }
            });
            self._ajaxSubmit(fnBefore, fnSuccess, fnComplete, fnError);
        },
        _uploadExtraOnly: function () {
            var self = this, params = {}, fnBefore, fnSuccess, fnComplete, fnError;
            self.formdata = new FormData();
            if (self._abort(params)) {
                return;
            }
            fnBefore = function (jqXHR) {
                self.lock();
                var outData = self._getOutData(jqXHR);
                self._raise('filebatchpreupload', [outData]);
                self._setProgress(50);
                params.data = outData;
                params.xhr = jqXHR;
                if (self._abort(params)) {
                    jqXHR.abort();
                    self._setProgressCancelled();
                }
            };
            fnSuccess = function (data, textStatus, jqXHR) {
                var outData = self._getOutData(jqXHR, data);
                if ($h.isEmpty(data) || $h.isEmpty(data.error)) {
                    self._raise('filebatchuploadsuccess', [outData]);
                    self._clearFileInput();
                    self._initUploadSuccess(data);
                    self._setProgress(101);
                } else {
                    self._showUploadError(data.error, outData, 'filebatchuploaderror');
                }
            };
            fnComplete = function () {
                self.unlock();
                self._clearFileInput();
                self._raise('filebatchuploadcomplete', [self.filestack, self._getExtraData()]);
            };
            fnError = function (jqXHR, textStatus, errorThrown) {
                var outData = self._getOutData(jqXHR), op = self.ajaxOperations.uploadExtra,
                    errMsg = self._parseError(op, jqXHR, errorThrown);
                params.data = outData;
                self._showUploadError(errMsg, outData, 'filebatchuploaderror');
                self._setProgress(101, self.$progress, self.msgAjaxProgressError.replace('{operation}', op));
            };
            self._ajaxSubmit(fnBefore, fnSuccess, fnComplete, fnError);
        },
        _deleteFileIndex: function ($frame) {
            var self = this, ind = $frame.attr('data-fileindex');
            if (ind.substring(0, 5) === 'init_') {
                ind = parseInt(ind.replace('init_', ''));
                self.initialPreview = $h.spliceArray(self.initialPreview, ind);
                self.initialPreviewConfig = $h.spliceArray(self.initialPreviewConfig, ind);
                self.initialPreviewThumbTags = $h.spliceArray(self.initialPreviewThumbTags, ind);
                self.getFrames().each(function () {
                    var $nFrame = $(this), nInd = $nFrame.attr('data-fileindex');
                    if (nInd.substring(0, 5) === 'init_') {
                        nInd = parseInt(nInd.replace('init_', ''));
                        if (nInd > ind) {
                            nInd--;
                            $nFrame.attr('data-fileindex', 'init_' + nInd);
                        }
                    }
                });
                if (self.uploadAsync) {
                    self.cacheInitialPreview = self.getPreview();
                }
            }
        },
        _initFileActions: function () {
            var self = this, $preview = self.$preview;
            if (!self.showPreview) {
                return;
            }
            self._initZoomButton();
            self.getFrames(' .kv-file-remove').each(function () {
                var $el = $(this), $frame = $el.closest($h.FRAMES), hasError, id = $frame.attr('id'),
                    ind = $frame.attr('data-fileindex'), n, cap, status;
                self._handler($el, 'click', function () {
                    status = self._raise('filepreremove', [id, ind]);
                    if (status === false || !self._validateMinCount()) {
                        return false;
                    }
                    hasError = $frame.hasClass('file-preview-error');
                    $h.cleanMemory($frame);
                    $frame.fadeOut('slow', function () {
                        $h.cleanZoomCache($preview.find('#zoom-' + id));
                        self.updateStack(ind, undefined);
                        self._clearObjects($frame);
                        $frame.remove();
                        if (id && hasError) {
                            self.$errorContainer.find('li[data-file-id="' + id + '"]').fadeOut('fast', function () {
                                $(this).remove();
                                if (!self._errorsExist()) {
                                    self._resetErrors();
                                }
                            });
                        }
                        self._clearFileInput();
                        var filestack = self.getFileStack(true), chk = self.previewCache.count(),
                            len = filestack.length, hasThumb = self.showPreview && self.getFrames().length;
                        if (len === 0 && chk === 0 && !hasThumb) {
                            self.reset();
                        } else {
                            n = chk + len;
                            cap = n > 1 ? self._getMsgSelected(n) : (filestack[0] ? self._getFileNames()[0] : '');
                            self._setCaption(cap);
                        }
                        self._raise('fileremoved', [id, ind]);
                    });
                });
            });
            self.getFrames(' .kv-file-upload').each(function () {
                var $el = $(this);
                self._handler($el, 'click', function () {
                    var $frame = $el.closest($h.FRAMES), ind = $frame.attr('data-fileindex');
                    if (!$frame.hasClass('file-preview-error')) {
                        self._uploadSingle(ind, self.filestack, false);
                    }
                });
            });
        },
        _initPreviewActions: function () {
            var self = this, $preview = self.$preview, deleteExtraData = self.deleteExtraData || {},
                btnRemove = $h.FRAMES + ' .kv-file-remove',
                resetProgress = function () {
                    var hasFiles = self.isUploadable ? self.previewCache.count() : self.$element.get(0).files.length;
                    if ($preview.find(btnRemove).length === 0 && !hasFiles) {
                        self.reset();
                        self.initialCaption = '';
                    }
                };
            self._initZoomButton();
            $preview.find(btnRemove).each(function () {
                var $el = $(this), vUrl = $el.data('url') || self.deleteUrl, vKey = $el.data('key');
                if ($h.isEmpty(vUrl) || vKey === undefined) {
                    return;
                }
                var $frame = $el.closest($h.FRAMES), cache = self.previewCache.data,
                    settings, params, index = $frame.attr('data-fileindex'), config, extraData;
                index = parseInt(index.replace('init_', ''));
                config = $h.isEmpty(cache.config) && $h.isEmpty(cache.config[index]) ? null : cache.config[index];
                extraData = $h.isEmpty(config) || $h.isEmpty(config.extra) ? deleteExtraData : config.extra;
                if (typeof extraData === "function") {
                    extraData = extraData();
                }
                params = {id: $el.attr('id'), key: vKey, extra: extraData};
                settings = $.extend(true, {}, {
                    url: vUrl,
                    type: 'POST',
                    dataType: 'json',
                    data: $.extend(true, {}, {key: vKey}, extraData),
                    beforeSend: function (jqXHR) {
                        self.ajaxAborted = false;
                        self._raise('filepredelete', [vKey, jqXHR, extraData]);
                        if (self.ajaxAborted) {
                            jqXHR.abort();
                        } else {
                            $h.addCss($frame, 'file-uploading');
                            $h.addCss($el, 'disabled');
                        }
                    },
                    success: function (data, textStatus, jqXHR) {
                        var n, cap;
                        if ($h.isEmpty(data) || $h.isEmpty(data.error)) {
                            index = parseInt(($frame.attr('data-fileindex')).replace('init_', ''));
                            self.previewCache.unset(index);
                            n = self.previewCache.count();
                            cap = n > 0 ? self._getMsgSelected(n) : '';
                            self._deleteFileIndex($frame);
                            self._setCaption(cap);
                            self._raise('filedeleted', [vKey, jqXHR, extraData]);
                        } else {
                            params.jqXHR = jqXHR;
                            params.response = data;
                            self._showError(data.error, params, 'filedeleteerror');
                            $frame.removeClass('file-uploading');
                            $el.removeClass('disabled');
                            resetProgress();
                            return;
                        }
                        $frame.removeClass('file-uploading').addClass('file-deleted');
                        $frame.fadeOut('slow', function () {
                            $h.cleanZoomCache($preview.find('#zoom-' + $frame.attr('id')));
                            self._clearObjects($frame);
                            $frame.remove();
                            resetProgress();
                            if (!n && self.getFileStack().length === 0) {
                                self._setCaption('');
                                self.reset();
                            }
                        });
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        var op = self.ajaxOperations.deleteThumb, errMsg = self._parseError(op, jqXHR, errorThrown);
                        params.jqXHR = jqXHR;
                        params.response = {};
                        self._showError(errMsg, params, 'filedeleteerror');
                        $frame.removeClass('file-uploading');
                        resetProgress();
                    }
                }, self.ajaxDeleteSettings);
                self._handler($el, 'click', function () {
                    if (!self._validateMinCount()) {
                        return false;
                    }
                    $.ajax(settings);
                });
            });
        },
        _hideFileIcon: function () {
            if (this.overwriteInitial) {
                this.$captionContainer.find('.kv-caption-icon').hide();
            }
        },
        _showFileIcon: function () {
            this.$captionContainer.find('.kv-caption-icon').show();
        },
        _getSize: function (bytes) {
            var self = this, size = parseFloat(bytes), i, func = self.fileSizeGetter, sizes, out;
            if (!$.isNumeric(bytes) || !$.isNumeric(size)) {
                return '';
            }
            if (typeof func === 'function') {
                out = func(size);
            } else {
                if (size === 0) {
                    out = '0.00 B';
                } else {
                    i = Math.floor(Math.log(size) / Math.log(1024));
                    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                    out = (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + sizes[i];
                }
            }
            return self._getLayoutTemplate('size').replace('{sizeText}', out);
        },
        _generatePreviewTemplate: function (cat, data, fname, ftype, previewId, isError, size, frameClass, foot, ind, templ) {
            var self = this, caption = self.slug(fname), prevContent, zoomContent = '',
                config = self.previewSettings[cat] || self.defaults.previewSettings[cat],
                w = config && config.width ? config.width : '', h = config && config.height ? config.height : '',
                footer = foot || self._renderFileFooter(caption, size, ($h.isEmpty(w) ? 'auto' : w), isError),
                hasIconSetting = self._getPreviewIcon(fname), typeCss = 'type-default',
                forcePrevIcon = hasIconSetting && self.preferIconicPreview,
                forceZoomIcon = hasIconSetting && self.preferIconicZoomPreview,
                getContent = function (c, d, zoom, frameCss) {
                    var id = zoom ? 'zoom-' + previewId : previewId, tmplt = self._getPreviewTemplate(c),
                        css = (frameClass || '') + ' ' + frameCss;
                    if (self.frameClass) {
                        css = self.frameClass + ' ' + css;
                    }
                    if (zoom) {
                        css = css.replace(' ' + $h.SORT_CSS, '');
                    }
                    tmplt = self._parseFilePreviewIcon(tmplt, fname);
                    if (c === 'text') {
                        d = $h.htmlEncode(d);
                    }
                    if (cat === 'object' && !ftype) {
                        $.each(self.defaults.fileTypeSettings, function (key, func) {
                            if (key === 'object' || key === 'other') {
                                return;
                            }
                            if (func(fname, ftype)) {
                                typeCss = 'type-' + key;
                            }
                        });
                    }
                    return tmplt.setTokens({
                        'previewId': id,
                        'caption': caption,
                        'frameClass': css,
                        'type': ftype,
                        'fileindex': ind,
                        'width': w,
                        'height': h,
                        'typeCss': typeCss,
                        'footer': footer,
                        'data': d,
                        'template': templ || cat
                    });
                };
            ind = ind || previewId.slice(previewId.lastIndexOf('-') + 1);
            if (self.fileActionSettings.showZoom) {
                zoomContent = getContent((forceZoomIcon ? 'other' : cat), data, true, 'kv-zoom-thumb');
            }
            zoomContent = '\n' + self._getLayoutTemplate('zoomCache').replace('{zoomContent}', zoomContent);
            prevContent = getContent((forcePrevIcon ? 'other' : cat), data, false, 'kv-preview-thumb');
            return prevContent + zoomContent;
        },
        _previewDefault: function (file, previewId, isDisabled) {
            var self = this, $preview = self.$preview;
            if (!self.showPreview) {
                return;
            }
            var fname = file ? file.name : '', ftype = file ? file.type : '', content, size = file.size || 0,
                caption = self.slug(fname), isError = isDisabled === true && !self.isUploadable,
                data = $h.objUrl.createObjectURL(file);
            self._clearDefaultPreview();
            content = self._generatePreviewTemplate('other', data, fname, ftype, previewId, isError, size);
            $preview.append("\n" + content);
            self._setThumbAttr(previewId, caption, size);
            if (isDisabled === true && self.isUploadable) {
                self._setThumbStatus($('#' + previewId), 'Error');
            }
        },
        _previewFile: function (i, file, theFile, previewId, data) {
            if (!this.showPreview) {
                return;
            }
            var self = this, cat = self._parseFileType(file), fname = file ? file.name : '', caption = self.slug(fname),
                types = self.allowedPreviewTypes, mimes = self.allowedPreviewMimeTypes, $preview = self.$preview,
                chkTypes = types && types.indexOf(cat) >= 0, fsize = file.size || 0, ftype = file.type,
                iData = (cat === 'text' || cat === 'html' || cat === 'image') ? theFile.target.result : data, content,
                chkMimes = mimes && mimes.indexOf(ftype) !== -1;
            /** @namespace window.DOMPurify */
            if (cat === 'html' && self.purifyHtml && window.DOMPurify) {
                iData = window.DOMPurify.sanitize(iData);
            }
            if (chkTypes || chkMimes) {
                content = self._generatePreviewTemplate(cat, iData, fname, ftype, previewId, false, fsize);
                self._clearDefaultPreview();
                $preview.append("\n" + content);
                var $img = $preview.find('#' + previewId + ' img');
                if ($img.length && self.autoOrientImage) {
                    $h.validateOrientation(file, function (value) {
                        if (value) {
                            var $zoomImg = $preview.find('#zoom-' + previewId + ' img'), css = 'rotate-' + value;
                            if (value > 4) {
                                css += ($img.width() > $img.height() ? ' is-portrait-gt4' : ' is-landscape-gt4');
                            }
                            $h.addCss($img, css);
                            $h.addCss($zoomImg, css);
                            self._raise('fileimageoriented', {'$img': $img, 'file': file});
                        }
                        self._validateImage(previewId, caption, ftype, fsize, iData);
                        $h.adjustOrientedImage($img);
                    });
                } else {
                    self._validateImage(previewId, caption, ftype, fsize, iData);
                }
            } else {
                self._previewDefault(file, previewId);
            }
            self._setThumbAttr(previewId, caption, fsize);
            self._initSortable();
        },
        _setThumbAttr: function (id, caption, size) {
            var self = this, $frame = $('#' + id);
            if ($frame.length) {
                size = size && size > 0 ? self._getSize(size) : '';
                $frame.data({'caption': caption, 'size': size});
            }
        },
        _setInitThumbAttr: function () {
            var self = this, data = self.previewCache.data, len = self.previewCache.count(true), config,
                caption, size, previewId;
            if (len === 0) {
                return;
            }
            for (var i = 0; i < len; i++) {
                config = data.config[i];
                previewId = self.previewInitId + '-' + 'init_' + i;
                caption = $h.ifSet('caption', config, $h.ifSet('filename', config));
                size = $h.ifSet('size', config);
                self._setThumbAttr(previewId, caption, size);
            }
        },
        _slugDefault: function (text) {
            return $h.isEmpty(text) ? '' : String(text).replace(/[\-\[\]\/\{}:;#%=\(\)\*\+\?\\\^\$\|<>&"']/g, '_');
        },
        _readFiles: function (files) {
            this.reader = new FileReader();
            var self = this, $el = self.$element, $preview = self.$preview, reader = self.reader,
                $container = self.$previewContainer, $status = self.$previewStatus, msgLoading = self.msgLoading,
                msgProgress = self.msgProgress, previewInitId = self.previewInitId, numFiles = files.length,
                settings = self.fileTypeSettings, ctr = self.filestack.length, readFile,
                fileTypes = self.allowedFileTypes, typLen = fileTypes ? fileTypes.length : 0,
                fileExt = self.allowedFileExtensions, strExt = $h.isEmpty(fileExt) ? '' : fileExt.join(', '),
                maxPreviewSize = self.maxFilePreviewSize && parseFloat(self.maxFilePreviewSize),
                canPreview = $preview.length && (!maxPreviewSize || isNaN(maxPreviewSize)),
                throwError = function (msg, file, previewId, index) {
                    var p1 = $.extend(true, {}, self._getOutData({}, {}, files), {id: previewId, index: index}),
                        p2 = {id: previewId, index: index, file: file, files: files};
                    self._previewDefault(file, previewId, true);
                    if (self.isUploadable) {
                        self.addToStack(undefined);
                        setTimeout(function () {
                            readFile(index + 1);
                        }, 100);
                    }
                    self._initFileActions();
                    if (self.removeFromPreviewOnError) {
                        $('#' + previewId).remove();
                    }
                    return self.isUploadable ? self._showUploadError(msg, p1) : self._showError(msg, p2);
                };

            self.loadedImages = [];
            self.totalImagesCount = 0;

            $.each(files, function (key, file) {
                var func = self.fileTypeSettings.image;
                if (func && func(file.type)) {
                    self.totalImagesCount++;
                }
            });
            readFile = function (i) {
                if ($h.isEmpty($el.attr('multiple'))) {
                    numFiles = 1;
                }
                if (i >= numFiles) {
                    if (self.isUploadable && self.filestack.length > 0) {
                        self._raise('filebatchselected', [self.getFileStack()]);
                    } else {
                        self._raise('filebatchselected', [files]);
                    }
                    $container.removeClass('file-thumb-loading');
                    $status.html('');
                    return;
                }
                var node = ctr + i, previewId = previewInitId + "-" + node, isText, isImage, file = files[i], fSizeKB,
                    caption = file.name ? self.slug(file.name) : '', fileSize = (file.size || 0) / 1000, j, msg,
                    fileExtExpr = '', previewData = $h.objUrl.createObjectURL(file), typ, chk, typ1, typ2,
                    fileCount = 0, strTypes = '', func;
                if (typLen > 0) {
                    for (j = 0; j < typLen; j++) {
                        typ1 = fileTypes[j];
                        typ2 = self.msgFileTypes[typ1] || typ1;
                        strTypes += j === 0 ? typ2 : ', ' + typ2;
                    }
                }
                if (caption === false) {
                    readFile(i + 1);
                    return;
                }
                if (caption.length === 0) {
                    msg = self.msgInvalidFileName.replace('{name}', $h.htmlEncode(file.name));
                    self.isError = throwError(msg, file, previewId, i);
                    return;
                }
                if (!$h.isEmpty(fileExt)) {
                    fileExtExpr = new RegExp('\\.(' + fileExt.join('|') + ')$', 'i');
                }
                fSizeKB = fileSize.toFixed(2);
                if (self.maxFileSize > 0 && fileSize > self.maxFileSize) {
                    msg = self.msgSizeTooLarge.setTokens({
                        'name': caption,
                        'size': fSizeKB,
                        'maxSize': self.maxFileSize
                    });
                    self.isError = throwError(msg, file, previewId, i);
                    return;
                }
                if (self.minFileSize !== null && fileSize <= $h.getNum(self.minFileSize)) {
                    msg = self.msgSizeTooSmall.setTokens({
                        'name': caption,
                        'size': fSizeKB,
                        'minSize': self.minFileSize
                    });
                    self.isError = throwError(msg, file, previewId, i);
                    return;
                }
                if (!$h.isEmpty(fileTypes) && $h.isArray(fileTypes)) {
                    for (j = 0; j < fileTypes.length; j += 1) {
                        typ = fileTypes[j];
                        func = settings[typ];
                        fileCount += !func || (typeof func !== 'function') ? 0 : (func(file.type, file.name) ? 1 : 0);
                    }
                    if (fileCount === 0) {
                        msg = self.msgInvalidFileType.setTokens({'name': caption, 'types': strTypes});
                        self.isError = throwError(msg, file, previewId, i);
                        return;
                    }
                }
                if (fileCount === 0 && !$h.isEmpty(fileExt) && $h.isArray(fileExt) && !$h.isEmpty(fileExtExpr)) {
                    chk = $h.compare(caption, fileExtExpr);
                    fileCount += $h.isEmpty(chk) ? 0 : chk.length;
                    if (fileCount === 0) {
                        msg = self.msgInvalidFileExtension.setTokens({'name': caption, 'extensions': strExt});
                        self.isError = throwError(msg, file, previewId, i);
                        return;
                    }
                }
                if (!self.showPreview) {
                    if (self.isUploadable) {
                        self.addToStack(file);
                    }
                    setTimeout(function () {
                        readFile(i + 1);
                        self._updateFileDetails(numFiles);
                    }, 100);
                    self._raise('fileloaded', [file, previewId, i, reader]);
                    return;
                }
                if (!canPreview && fileSize > maxPreviewSize) {
                    self.addToStack(file);
                    $container.addClass('file-thumb-loading');
                    self._previewDefault(file, previewId);
                    self._initFileActions();
                    self._updateFileDetails(numFiles);
                    readFile(i + 1);
                    return;
                }
                if ($preview.length && FileReader !== undefined) {
                    $status.html(msgLoading.replace('{index}', i + 1).replace('{files}', numFiles));
                    $container.addClass('file-thumb-loading');
                    reader.onerror = function (evt) {
                        self._errorHandler(evt, caption);
                    };
                    reader.onload = function (theFile) {
                        self._previewFile(i, file, theFile, previewId, previewData);
                        self._initFileActions();
                    };
                    reader.onloadend = function () {
                        msg = msgProgress.setTokens({
                            'index': i + 1,
                            'files': numFiles,
                            'percent': 50,
                            'name': caption
                        });
                        setTimeout(function () {
                            $status.html(msg);
                            self._updateFileDetails(numFiles);
                            readFile(i + 1);
                        }, 100);
                        self._raise('fileloaded', [file, previewId, i, reader]);
                    };
                    reader.onprogress = function (data) {
                        if (data.lengthComputable) {
                            var fact = (data.loaded / data.total) * 100, progress = Math.ceil(fact);
                            msg = msgProgress.setTokens({
                                'index': i + 1,
                                'files': numFiles,
                                'percent': progress,
                                'name': caption
                            });
                            setTimeout(function () {
                                $status.html(msg);
                            }, 100);
                        }
                    };
                    isText = settings.text;
                    isImage = settings.image;

                    if (isText(file.type, caption)) {
                        reader.readAsText(file, self.textEncoding);
                    } else {
                        if (isImage(file.type, caption)) {
                            reader.readAsDataURL(file);
                        } else {
                            reader.readAsArrayBuffer(file);
                        }
                    }
                } else {
                    self._previewDefault(file, previewId);
                    setTimeout(function () {
                        readFile(i + 1);
                        self._updateFileDetails(numFiles);
                    }, 100);
                    self._raise('fileloaded', [file, previewId, i, reader]);
                }
                self.addToStack(file);
            };

            readFile(0);
            self._updateFileDetails(numFiles, false);
        },
        _updateFileDetails: function (numFiles) {
            var self = this, $el = self.$element, fileStack = self.getFileStack(),
                name = ($h.isIE(9) && $h.findFileName($el.val())) ||
                    ($el[0].files[0] && $el[0].files[0].name) || (fileStack.length && fileStack[0].name) || '',
                label = self.slug(name), n = self.isUploadable ? fileStack.length : numFiles,
                nFiles = self.previewCache.count() + n, log = n > 1 ? self._getMsgSelected(nFiles) : label;
            if (self.isError) {
                self.$previewContainer.removeClass('file-thumb-loading');
                self.$previewStatus.html('');
                self.$captionContainer.find('.kv-caption-icon').hide();
            } else {
                self._showFileIcon();
            }
            self._setCaption(log, self.isError);
            self.$container.removeClass('file-input-new file-input-ajax-new');
            if (arguments.length === 1) {
                self._raise('fileselect', [numFiles, label]);
            }
            if (self.previewCache.count()) {
                self._initPreviewActions();
            }
        },
        _setThumbStatus: function ($thumb, status) {
            var self = this;
            if (!self.showPreview) {
                return;
            }
            var icon = 'indicator' + status, msg = icon + 'Title',
                css = 'file-preview-' + status.toLowerCase(),
                $indicator = $thumb.find('.file-upload-indicator'),
                config = self.fileActionSettings;
            $thumb.removeClass('file-preview-success file-preview-error file-preview-loading');
            if (status === 'Error') {
                $thumb.find('.kv-file-upload').attr('disabled', true);
            }
            if (status === 'Success') {
                $thumb.find('.file-drag-handle').remove();
                $indicator.css('margin-left', 0);
            }
            $indicator.html(config[icon]);
            $indicator.attr('title', config[msg]);
            $thumb.addClass(css);
        },
        _setProgressCancelled: function () {
            var self = this;
            self._setProgress(101, self.$progress, self.msgCancelled);
        },
        _setProgress: function (p, $el, error) {
            var self = this, pct = Math.min(p, 100), out, pctLimit = self.progressUploadThreshold,
                t = p <= 100 ? self.progressTemplate : self.progressCompleteTemplate,
                template = pct < 100 ? self.progressTemplate : (error ? self.progressErrorTemplate : t);
            $el = $el || self.$progress;
            if (!$h.isEmpty(template)) {
                if (pctLimit && pct > pctLimit && p <= 100) {
                    out = template.setTokens({'percent': pctLimit, 'status': self.msgUploadThreshold});
                } else {
                    out = template.setTokens({'percent': pct, 'status': (p > 100 ? self.msgUploadEnd : pct + '%')});
                }
                $el.html(out);
                if (error) {
                    $el.find('[role="progressbar"]').html(error);
                }
            }
        },
        _setFileDropZoneTitle: function () {
            var self = this, $zone = self.$container.find('.file-drop-zone'), title = self.dropZoneTitle, strFiles;
            if (self.isClickable) {
                strFiles = $h.isEmpty(self.$element.attr('multiple')) ? self.fileSingle : self.filePlural;
                title += self.dropZoneClickTitle.replace('{files}', strFiles);
            }
            $zone.find('.' + self.dropZoneTitleClass).remove();
            if (!self.isUploadable || !self.showPreview || $zone.length === 0 || self.getFileStack().length > 0 || !self.dropZoneEnabled) {
                return;
            }
            if ($zone.find($h.FRAMES).length === 0 && $h.isEmpty(self.defaultPreviewContent)) {
                $zone.prepend('<div class="' + self.dropZoneTitleClass + '">' + title + '</div>');
            }
            self.$container.removeClass('file-input-new');
            $h.addCss(self.$container, 'file-input-ajax-new');
        },
        _setAsyncUploadStatus: function (previewId, pct, total) {
            var self = this, sum = 0;
            self._setProgress(pct, $('#' + previewId).find('.file-thumb-progress'));
            self.uploadStatus[previewId] = pct;
            $.each(self.uploadStatus, function (key, value) {
                sum += value;
            });
            self._setProgress(Math.floor(sum / total));

        },
        _validateMinCount: function () {
            var self = this, len = self.isUploadable ? self.getFileStack().length : self.$element.get(0).files.length;
            if (self.validateInitialCount && self.minFileCount > 0 && self._getFileCount(len - 1) < self.minFileCount) {
                self._noFilesError({});
                return false;
            }
            return true;
        },
        _getFileCount: function (fileCount) {
            var self = this, addCount = 0;
            if (self.validateInitialCount && !self.overwriteInitial) {
                addCount = self.previewCache.count();
                fileCount += addCount;
            }
            return fileCount;
        },
        _getFileId: function (file) {
            var self = this, custom = self.generateFileId, relativePath;
            if (typeof custom === 'function') {
                return custom(file, event);
            }
            if (!file) {
                return null;
            }
            /** @namespace file.webkitRelativePath */
            relativePath = file.webkitRelativePath || file.fileName || file.name || null;
            if (!relativePath) {
                return null;
            }
            return (file.size + '-' + relativePath.replace(/[^0-9a-zA-Z_-]/img, ''));
        },
        _getFileName: function (file) {
            return file && file.name ? this.slug(file.name) : undefined;
        },
        _getFileIds: function (skipNull) {
            var self = this;
            return self.fileids.filter(function (n) {
                return (skipNull ? n !== undefined : n !== undefined && n !== null);
            });
        },
        _getFileNames: function (skipNull) {
            var self = this;
            return self.filenames.filter(function (n) {
                return (skipNull ? n !== undefined : n !== undefined && n !== null);
            });
        },
        _setPreviewError: function ($thumb, i, val) {
            var self = this;
            if (i !== undefined) {
                self.updateStack(i, val);
            }
            if (self.removeFromPreviewOnError) {
                $thumb.remove();
            } else {
                self._setThumbStatus($thumb, 'Error');
            }
        },
        _checkDimensions: function (i, chk, $img, $thumb, fname, type, params) {
            var self = this, msg, dim, tag = chk === 'Small' ? 'min' : 'max', limit = self[tag + 'Image' + type],
                $imgEl, isValid;
            if ($h.isEmpty(limit) || !$img.length) {
                return;
            }
            $imgEl = $img[0];
            dim = (type === 'Width') ? $imgEl.naturalWidth || $imgEl.width : $imgEl.naturalHeight || $imgEl.height;
            isValid = chk === 'Small' ? dim >= limit : dim <= limit;
            if (isValid) {
                return;
            }
            msg = self['msgImage' + type + chk].setTokens({'name': fname, 'size': limit});
            self._showUploadError(msg, params);
            self._setPreviewError($thumb, i, null);
        },
        _validateImage: function (previewId, fname, ftype, fsize, iData) {
            var self = this, $preview = self.$preview, params, w1, w2, $thumb = $preview.find("#" + previewId),
                i = $thumb.attr('data-fileindex'), $img = $thumb.find('img'), exifObject;
            fname = fname || 'Untitled';
            $img.one('load', function () {
                w1 = $thumb.width();
                w2 = $preview.width();
                if (w1 > w2) {
                    $img.css('width', '100%');
                }
                params = {ind: i, id: previewId};
                self._checkDimensions(i, 'Small', $img, $thumb, fname, 'Width', params);
                self._checkDimensions(i, 'Small', $img, $thumb, fname, 'Height', params);
                if (!self.resizeImage) {
                    self._checkDimensions(i, 'Large', $img, $thumb, fname, 'Width', params);
                    self._checkDimensions(i, 'Large', $img, $thumb, fname, 'Height', params);
                }
                self._raise('fileimageloaded', [previewId]);
                exifObject = window.piexif ? window.piexif.load(iData) : null;
                self.loadedImages.push({
                    ind: i,
                    img: $img,
                    thumb: $thumb,
                    pid: previewId,
                    typ: ftype,
                    siz: fsize,
                    validated: false,
                    imgData: iData,
                    exifObj: exifObject
                });
                $thumb.data('exif', exifObject);
                self._validateAllImages();
            }).one('error', function () {
                self._raise('fileimageloaderror', [previewId]);
            }).each(function () {
                if (this.complete) {
                    $(this).trigger('load');
                } else {
                    if (this.error) {
                        $(this).trigger('error');
                    }
                }
            });
        },
        _validateAllImages: function () {
            var self = this, i, counter = {val: 0}, numImgs = self.loadedImages.length, config,
                fsize, minSize = self.resizeIfSizeMoreThan;
            if (numImgs !== self.totalImagesCount) {
                return;
            }
            self._raise('fileimagesloaded');
            if (!self.resizeImage) {
                return;
            }
            for (i = 0; i < self.loadedImages.length; i++) {
                config = self.loadedImages[i];
                if (config.validated) {
                    continue;
                }
                fsize = config.siz;
                if (fsize && fsize > minSize * 1000) {
                    self._getResizedImage(config, counter, numImgs);
                }
                self.loadedImages[i].validated = true;
            }
        },
        _getResizedImage: function (config, counter, numImgs) {
            var self = this, img = $(config.img)[0], width = img.naturalWidth, height = img.naturalHeight, blob,
                ratio = 1, maxWidth = self.maxImageWidth || width, maxHeight = self.maxImageHeight || height,
                isValidImage = !!(width && height), chkWidth, chkHeight, canvas = self.imageCanvas, dataURI,
                context = self.imageCanvasContext, type = config.typ, pid = config.pid, ind = config.ind,
                $thumb = config.thumb, throwError, msg, exifObj = config.exifObj, exifStr;
            throwError = function (msg, params, ev) {
                if (self.isUploadable) {
                    self._showUploadError(msg, params, ev);
                } else {
                    self._showError(msg, params, ev);
                }
                self._setPreviewError($thumb, ind);
            };
            if (!self.filestack[ind] || !isValidImage || (width <= maxWidth && height <= maxHeight)) {
                if (isValidImage && self.filestack[ind]) {
                    self._raise('fileimageresized', [pid, ind]);
                }
                counter.val++;
                if (counter.val === numImgs) {
                    self._raise('fileimagesresized');
                }
                if (!isValidImage) {
                    throwError(self.msgImageResizeError, {id: pid, 'index': ind}, 'fileimageresizeerror');
                    return;
                }
            }
            type = type || self.resizeDefaultImageType;
            chkWidth = width > maxWidth;
            chkHeight = height > maxHeight;
            if (self.resizePreference === 'width') {
                ratio = chkWidth ? maxWidth / width : (chkHeight ? maxHeight / height : 1);
            } else {
                ratio = chkHeight ? maxHeight / height : (chkWidth ? maxWidth / width : 1);
            }
            self._resetCanvas();
            width *= ratio;
            height *= ratio;
            canvas.width = width;
            canvas.height = height;
            try {
                context.drawImage(img, 0, 0, width, height);
                dataURI = canvas.toDataURL(type, self.resizeQuality);
                if (exifObj) {
                    exifStr = window.piexif.dump(exifObj);
                    dataURI = window.piexif.insert(exifStr, dataURI);
                }
                blob = $h.dataURI2Blob(dataURI);
                self.filestack[ind] = blob;
                self._raise('fileimageresized', [pid, ind]);
                counter.val++;
                if (counter.val === numImgs) {
                    self._raise('fileimagesresized', [undefined, undefined]);
                }
                if (!(blob instanceof Blob)) {
                    throwError(self.msgImageResizeError, {id: pid, 'index': ind}, 'fileimageresizeerror');
                }
            }
            catch (err) {
                counter.val++;
                if (counter.val === numImgs) {
                    self._raise('fileimagesresized', [undefined, undefined]);
                }
                msg = self.msgImageResizeException.replace('{errors}', err.message);
                throwError(msg, {id: pid, 'index': ind}, 'fileimageresizeexception');
            }
        },
        _initBrowse: function ($container) {
            var self = this;
            if (self.showBrowse) {
                self.$btnFile = $container.find('.btn-file');
                self.$btnFile.append(self.$element);
            } else {
                self.$element.hide();
            }
        },
        _initCaption: function () {
            var self = this, cap = self.initialCaption || '';
            if (self.overwriteInitial || $h.isEmpty(cap)) {
                self.$caption.html('');
                return false;
            }
            self._setCaption(cap);
            return true;
        },
        _setCaption: function (content, isError) {
            var self = this, title, out, n, cap, stack = self.getFileStack();
            if (!self.$caption.length) {
                return;
            }
            if (isError) {
                title = $('<div>' + self.msgValidationError + '</div>').text();
                n = stack.length;
                if (n) {
                    cap = n === 1 && stack[0] ? self._getFileNames()[0] : self._getMsgSelected(n);
                } else {
                    cap = self._getMsgSelected(self.msgNo);
                }
                out = '<span class="' + self.msgValidationErrorClass + '">' + self.msgValidationErrorIcon +
                    ($h.isEmpty(content) ? cap : content) + '</span>';
            } else {
                if ($h.isEmpty(content)) {
                    return;
                }
                title = $('<div>' + content + '</div>').text();
                out = self._getLayoutTemplate('fileIcon') + title;
            }
            self.$caption.html(out);
            self.$caption.attr('title', title);
            self.$captionContainer.find('.file-caption-ellipsis').attr('title', title);
        },
        _createContainer: function () {
            var self = this, attribs = {"class": 'file-input file-input-new' + (self.rtl ? ' kv-rtl' : '')},
                $container = $(document.createElement("div")).attr(attribs).html(self._renderMain());
            self.$element.before($container);
            self._initBrowse($container);
            if (self.theme) {
                $container.addClass('theme-' + self.theme);
            }
            return $container;
        },
        _refreshContainer: function () {
            var self = this, $container = self.$container;
            $container.before(self.$element);
            $container.html(self._renderMain());
            self._initBrowse($container);
        },
        _renderMain: function () {
            var self = this,
                dropCss = (self.isUploadable && self.dropZoneEnabled) ? ' file-drop-zone' : 'file-drop-disabled',
                close = !self.showClose ? '' : self._getLayoutTemplate('close'),
                preview = !self.showPreview ? '' : self._getLayoutTemplate('preview')
                    .setTokens({'class': self.previewClass, 'dropClass': dropCss}),
                css = self.isDisabled ? self.captionClass + ' file-caption-disabled' : self.captionClass,
                caption = self.captionTemplate.setTokens({'class': css + ' kv-fileinput-caption'});
            return self.mainTemplate.setTokens({
                'class': self.mainClass + (!self.showBrowse && self.showCaption ? ' no-browse' : ''),
                'preview': preview,
                'close': close,
                'caption': caption,
                'upload': self._renderButton('upload'),
                'remove': self._renderButton('remove'),
                'cancel': self._renderButton('cancel'),
                'browse': self._renderButton('browse')
            });

        },
        _renderButton: function (type) {
            var self = this, tmplt = self._getLayoutTemplate('btnDefault'), css = self[type + 'Class'],
                title = self[type + 'Title'], icon = self[type + 'Icon'], label = self[type + 'Label'],
                status = self.isDisabled ? ' disabled' : '', btnType = 'button';
            switch (type) {
                case 'remove':
                    if (!self.showRemove) {
                        return '';
                    }
                    break;
                case 'cancel':
                    if (!self.showCancel) {
                        return '';
                    }
                    css += ' hide';
                    break;
                case 'upload':
                    if (!self.showUpload) {
                        return '';
                    }
                    if (self.isUploadable && !self.isDisabled) {
                        tmplt = self._getLayoutTemplate('btnLink').replace('{href}', self.uploadUrl);
                    } else {
                        btnType = 'submit';
                    }
                    break;
                case 'browse':
                    if (!self.showBrowse) {
                        return '';
                    }
                    tmplt = self._getLayoutTemplate('btnBrowse');
                    break;
                default:
                    return '';
            }

            css += type === 'browse' ? ' btn-file' : ' fileinput-' + type + ' fileinput-' + type + '-button';
            if (!$h.isEmpty(label)) {
                label = ' <span class="' + self.buttonLabelClass + '">' + label + '</span>';
            }
            return tmplt.setTokens({
                'type': btnType, 'css': css, 'title': title, 'status': status, 'icon': icon, 'label': label
            });
        },
        _renderThumbProgress: function () {
            var self = this;
            return '<div class="file-thumb-progress hide">' +
                self.progressTemplate.setTokens({'percent': '0', 'status': self.msgUploadBegin}) +
                '</div>';
        },
        _renderFileFooter: function (caption, size, width, isError) {
            var self = this, config = self.fileActionSettings, rem = config.showRemove, drg = config.showDrag,
                upl = config.showUpload, zoom = config.showZoom, out, template = self._getLayoutTemplate('footer'),
                ind = isError ? config.indicatorError : config.indicatorNew,
                tInd = self._getLayoutTemplate('indicator'),
                title = isError ? config.indicatorErrorTitle : config.indicatorNewTitle,
                indicator = tInd.setTokens({'indicator': ind, 'indicatorTitle': title});
            size = self._getSize(size);
            if (self.isUploadable) {
                out = template.setTokens({
                    'actions': self._renderFileActions(upl, rem, zoom, drg, false, false, false),
                    'caption': caption,
                    'size': size,
                    'width': width,
                    'progress': self._renderThumbProgress(),
                    'indicator': indicator
                });
            } else {
                out = template.setTokens({
                    'actions': self._renderFileActions(false, false, zoom, drg, false, false, false),
                    'caption': caption,
                    'size': size,
                    'width': width,
                    'progress': '',
                    'indicator': indicator
                });
            }
            out = $h.replaceTags(out, self.previewThumbTags);
            return out;
        },
        _renderFileActions: function (showUpload, showDelete, showZoom, showDrag, disabled, url, key, isInit) {
            if (!showUpload && !showDelete && !showZoom && !showDrag) {
                return '';
            }
            var self = this, vUrl = url === false ? '' : ' data-url="' + url + '"',
                vKey = key === false ? '' : ' data-key="' + key + '"',
                btnDelete = '', btnUpload = '', btnZoom = '', btnDrag = '', css,
                template = self._getLayoutTemplate('actions'), config = self.fileActionSettings,
                otherButtons = self.otherActionButtons.setTokens({'dataKey': vKey}),
                removeClass = disabled ? config.removeClass + ' disabled' : config.removeClass;
            if (showDelete) {
                btnDelete = self._getLayoutTemplate('actionDelete').setTokens({
                    'removeClass': removeClass,
                    'removeIcon': config.removeIcon,
                    'removeTitle': config.removeTitle,
                    'dataUrl': vUrl,
                    'dataKey': vKey
                });
            }
            if (showUpload) {
                btnUpload = self._getLayoutTemplate('actionUpload').setTokens({
                    'uploadClass': config.uploadClass,
                    'uploadIcon': config.uploadIcon,
                    'uploadTitle': config.uploadTitle
                });
            }
            if (showZoom) {
                btnZoom = self._getLayoutTemplate('actionZoom').setTokens({
                    'zoomClass': config.zoomClass,
                    'zoomIcon': config.zoomIcon,
                    'zoomTitle': config.zoomTitle
                });
            }
            if (showDrag && isInit) {
                css = 'drag-handle-init ' + config.dragClass;
                btnDrag = self._getLayoutTemplate('actionDrag').setTokens({
                    'dragClass': css,
                    'dragTitle': config.dragTitle,
                    'dragIcon': config.dragIcon
                });
            }
            return template.setTokens({
                'delete': btnDelete,
                'upload': btnUpload,
                'zoom': btnZoom,
                'drag': btnDrag,
                'other': otherButtons
            });
        },
        _browse: function (e) {
            var self = this;
            self._raise('filebrowse');
            if (e && e.isDefaultPrevented()) {
                return;
            }
            if (self.isError && !self.isUploadable) {
                self.clear();
            }
            self.$captionContainer.focus();
        },
        _filterDuplicate: function (file, files, fileIds) {
            var self = this, fileId = self._getFileId(file);
            if (fileId && fileIds && fileIds.indexOf(fileId) > -1) {
                return;
            }
            if (!fileIds) {
                fileIds = [];
            }
            files.push(file);
            fileIds.push(fileId);
        },
        _change: function (e) {
            var self = this, $el = self.$element;
            if (!self.isUploadable && $h.isEmpty($el.val()) && self.fileInputCleared) { // IE 11 fix
                self.fileInputCleared = false;
                return;
            }
            self.fileInputCleared = false;
            var tfiles = [], msg, total, isDragDrop = arguments.length > 1, isAjaxUpload = self.isUploadable, n, len,
                files = isDragDrop ? e.originalEvent.dataTransfer.files : $el.get(0).files, ctr = self.filestack.length,
                isSingleUpload = $h.isEmpty($el.attr('multiple')), flagSingle = (isSingleUpload && ctr > 0),
                folders = 0, fileIds = self._getFileIds(), throwError = function (mesg, file, previewId, index) {
                    var p1 = $.extend(true, {}, self._getOutData({}, {}, files), {id: previewId, index: index}),
                        p2 = {id: previewId, index: index, file: file, files: files};
                    return self.isUploadable ? self._showUploadError(mesg, p1) : self._showError(mesg, p2);
                };
            self.reader = null;
            self._resetUpload();
            self._hideFileIcon();
            if (self.isUploadable) {
                self.$container.find('.file-drop-zone .' + self.dropZoneTitleClass).remove();
            }
            if (isDragDrop) {
                $.each(files, function (i, f) {
                    if (f && !f.type && f.size !== undefined && f.size % 4096 === 0) {
                        folders++;
                    } else {
                        self._filterDuplicate(f, tfiles, fileIds);
                    }
                });
            } else {
                if (e.target && e.target.files === undefined) {
                    files = e.target.value ? [{name: e.target.value.replace(/^.+\\/, '')}] : [];
                } else {
                    files = e.target.files || {};
                }
                if (isAjaxUpload) {
                    $.each(files, function (i, f) {
                        self._filterDuplicate(f, tfiles, fileIds);
                    });
                } else {
                    tfiles = files;
                }
            }
            if ($h.isEmpty(tfiles) || tfiles.length === 0) {
                if (!isAjaxUpload) {
                    self.clear();
                }
                self._showFolderError(folders);
                self._raise('fileselectnone');
                return;
            }
            self._resetErrors();
            len = tfiles.length;
            total = self._getFileCount(self.isUploadable ? (self.getFileStack().length + len) : len);
            if (self.maxFileCount > 0 && total > self.maxFileCount) {
                if (!self.autoReplace || len > self.maxFileCount) {
                    n = (self.autoReplace && len > self.maxFileCount) ? len : total;
                    msg = self.msgFilesTooMany.replace('{m}', self.maxFileCount).replace('{n}', n);
                    self.isError = throwError(msg, null, null, null);
                    self.$captionContainer.find('.kv-caption-icon').hide();
                    self._setCaption('', true);
                    self.$container.removeClass('file-input-new file-input-ajax-new');
                    return;
                }
                if (total > self.maxFileCount) {
                    self._resetPreviewThumbs(isAjaxUpload);
                }
            } else {
                if (!isAjaxUpload || flagSingle) {
                    self._resetPreviewThumbs(false);
                    if (flagSingle) {
                        self.clearStack();
                    }
                } else {
                    if (isAjaxUpload && ctr === 0 && (!self.previewCache.count() || self.overwriteInitial)) {
                        self._resetPreviewThumbs(true);
                    }
                }
            }
            if (self.isPreviewable) {
                self._readFiles(tfiles);
            } else {
                self._updateFileDetails(1);
            }
            self._showFolderError(folders);
        },
        _abort: function (params) {
            var self = this, data;
            if (self.ajaxAborted && typeof self.ajaxAborted === "object" && self.ajaxAborted.message !== undefined) {
                data = $.extend(true, {}, self._getOutData(), params);
                data.abortData = self.ajaxAborted.data || {};
                data.abortMessage = self.ajaxAborted.message;
                self._setProgress(101, self.$progress, self.msgCancelled);
                self._showUploadError(self.ajaxAborted.message, data, 'filecustomerror');
                self.cancel();
                return true;
            }
            return false;
        },
        _resetFileStack: function () {
            var self = this, i = 0, newstack = [], newnames = [], newids = [];
            self._getThumbs().each(function () {
                var $thumb = $(this), ind = $thumb.attr('data-fileindex'), file = self.filestack[ind],
                    pid = $thumb.attr('id'), newId;
                if (ind === '-1' || ind === -1) {
                    return;
                }
                if (file !== undefined) {
                    newstack[i] = file;
                    newnames[i] = self._getFileName(file);
                    newids[i] = self._getFileId(file);
                    $thumb.attr({'id': self.previewInitId + '-' + i, 'data-fileindex': i});
                    i++;
                } else {
                    newId = 'uploaded-' + $h.uniqId();
                    $thumb.attr({'id': newId, 'data-fileindex': '-1'});
                    self.$preview.find('#zoom-' + pid).attr('id', 'zoom-' + newId);
                }
            });
            self.filestack = newstack;
            self.filenames = newnames;
            self.fileids = newids;
        },
        _isFileSelectionValid: function (cnt) {
            var self = this;
            cnt = cnt || 0;
            if (self.required && !self.getFilesCount()) {
                self.$errorContainer.html('');
                self._showUploadError(self.msgFileRequired);
                return false;
            }
            if (self.minFileCount > 0 && self._getFileCount(cnt) < self.minFileCount) {
                self._noFilesError({});
                return false;
            }
            return true;
        },
        clearStack: function () {
            var self = this;
            self.filestack = [];
            self.filenames = [];
            self.fileids = [];
            return self.$element;
        },
        updateStack: function (i, file) {
            var self = this;
            self.filestack[i] = file;
            self.filenames[i] = self._getFileName(file);
            self.fileids[i] = file && self._getFileId(file) || null;
            return self.$element;
        },
        addToStack: function (file) {
            var self = this;
            self.filestack.push(file);
            self.filenames.push(self._getFileName(file));
            self.fileids.push(self._getFileId(file));
            return self.$element;
        },
        getFileStack: function (skipNull) {
            var self = this;
            return self.filestack.filter(function (n) {
                return (skipNull ? n !== undefined : n !== undefined && n !== null);
            });
        },
        getFilesCount: function () {
            var self = this, len = self.isUploadable ? self.getFileStack().length : self.$element.get(0).files.length;
            return self._getFileCount(len);
        },
        lock: function () {
            var self = this;
            self._resetErrors();
            self.disable();
            if (self.showRemove) {
                $h.addCss(self.$container.find('.fileinput-remove'), 'hide');
            }
            if (self.showCancel) {
                self.$container.find('.fileinput-cancel').removeClass('hide');
            }
            self._raise('filelock', [self.filestack, self._getExtraData()]);
            return self.$element;
        },
        unlock: function (reset) {
            var self = this;
            if (reset === undefined) {
                reset = true;
            }
            self.enable();
            if (self.showCancel) {
                $h.addCss(self.$container.find('.fileinput-cancel'), 'hide');
            }
            if (self.showRemove) {
                self.$container.find('.fileinput-remove').removeClass('hide');
            }
            if (reset) {
                self._resetFileStack();
            }
            self._raise('fileunlock', [self.filestack, self._getExtraData()]);
            return self.$element;
        },
        cancel: function () {
            var self = this, xhr = self.ajaxRequests, len = xhr.length, i;
            if (len > 0) {
                for (i = 0; i < len; i += 1) {
                    self.cancelling = true;
                    xhr[i].abort();
                }
            }
            self._setProgressCancelled();
            self._getThumbs().each(function () {
                var $thumb = $(this), ind = $thumb.attr('data-fileindex');
                $thumb.removeClass('file-uploading');
                if (self.filestack[ind] !== undefined) {
                    $thumb.find('.kv-file-upload').removeClass('disabled').removeAttr('disabled');
                    $thumb.find('.kv-file-remove').removeClass('disabled').removeAttr('disabled');
                }
                self.unlock();
            });
            return self.$element;
        },
        clear: function () {
            var self = this, cap;
            if (!self._raise('fileclear')) {
                return;
            }
            self.$btnUpload.removeAttr('disabled');
            self._getThumbs().find('video,audio,img').each(function () {
                $h.cleanMemory($(this));
            });
            self._resetUpload();
            self.clearStack();
            self._clearFileInput();
            self._resetErrors(true);
            if (self._hasInitialPreview()) {
                self._showFileIcon();
                self._resetPreview();
                self._initPreviewActions();
                self.$container.removeClass('file-input-new');
            } else {
                self._getThumbs().each(function () {
                    self._clearObjects($(this));
                });
                if (self.isUploadable) {
                    self.previewCache.data = {};
                }
                self.$preview.html('');
                cap = (!self.overwriteInitial && self.initialCaption.length > 0) ? self.initialCaption : '';
                self.$caption.html(cap);
                self.$caption.attr('title', '');
                $h.addCss(self.$container, 'file-input-new');
                self._validateDefaultPreview();
            }
            if (self.$container.find($h.FRAMES).length === 0) {
                if (!self._initCaption()) {
                    self.$captionContainer.find('.kv-caption-icon').hide();
                }
            }
            self._hideFileIcon();
            self._raise('filecleared');
            self.$captionContainer.focus();
            self._setFileDropZoneTitle();
            return self.$element;
        },
        reset: function () {
            var self = this;
            if (!self._raise('filereset')) {
                return;
            }
            self._resetPreview();
            self.$container.find('.fileinput-filename').text('');
            $h.addCss(self.$container, 'file-input-new');
            if (self.getFrames().length || self.isUploadable && self.dropZoneEnabled) {
                self.$container.removeClass('file-input-new');
            }
            self._setFileDropZoneTitle();
            self.clearStack();
            self.formdata = {};
            return self.$element;
        },
        disable: function () {
            var self = this;
            self.isDisabled = true;
            self._raise('filedisabled');
            self.$element.attr('disabled', 'disabled');
            self.$container.find(".kv-fileinput-caption").addClass("file-caption-disabled");
            self.$container.find(".btn-file, .fileinput-remove, .fileinput-upload, .file-preview-frame button")
                .attr("disabled", true);
            self._initDragDrop();
            return self.$element;
        },
        enable: function () {
            var self = this;
            self.isDisabled = false;
            self._raise('fileenabled');
            self.$element.removeAttr('disabled');
            self.$container.find(".kv-fileinput-caption").removeClass("file-caption-disabled");
            self.$container.find(".btn-file, .fileinput-remove, .fileinput-upload, .file-preview-frame button")
                .removeAttr("disabled");
            self._initDragDrop();
            return self.$element;
        },
        upload: function () {
            var self = this, totLen = self.getFileStack().length, i, outData, len,
                hasExtraData = !$.isEmptyObject(self._getExtraData());
            if (!self.isUploadable || self.isDisabled || !self._isFileSelectionValid(totLen)) {
                return;
            }
            self._resetUpload();
            if (totLen === 0 && !hasExtraData) {
                self._showUploadError(self.msgUploadEmpty);
                return;
            }
            self.$progress.removeClass('hide');
            self.uploadCount = 0;
            self.uploadStatus = {};
            self.uploadLog = [];
            self.lock();
            self._setProgress(2);
            if (totLen === 0 && hasExtraData) {
                self._uploadExtraOnly();
                return;
            }
            len = self.filestack.length;
            self.hasInitData = false;
            if (self.uploadAsync) {
                outData = self._getOutData();
                self._raise('filebatchpreupload', [outData]);
                self.fileBatchCompleted = false;
                self.uploadCache = {content: [], config: [], tags: [], append: true};
                self.uploadAsyncCount = self.getFileStack().length;
                for (i = 0; i < len; i++) {
                    self.uploadCache.content[i] = null;
                    self.uploadCache.config[i] = null;
                    self.uploadCache.tags[i] = null;
                }
                self.$preview.find('.file-preview-initial').removeClass($h.SORT_CSS);
                self._initSortable();
                self.cacheInitialPreview = self.getPreview();

                for (i = 0; i < len; i++) {
                    if (self.filestack[i] !== undefined) {
                        self._uploadSingle(i, self.filestack, true);
                    }
                }
                return;
            }
            self._uploadBatch();
            return self.$element;
        },
        destroy: function () {
            var self = this, $form = self.$form, $cont = self.$container, $el = self.$element, ns = self.namespace;
            $(document).off(ns);
            $(window).off(ns);
            if ($form && $form.length) {
                $form.off(ns);
            }
            if (self.isUploadable) {
                self._clearFileInput();
            }
            self._cleanup();
            self._initPreviewCache();
            $el.insertBefore($cont).off(ns).removeData();
            $cont.off().remove();
            return $el;
        },
        refresh: function (options) {
            var self = this, $el = self.$element;
            options = options ? $.extend(true, {}, self.options, options) : self.options;
            self.destroy();
            $el.fileinput(options);
            self = $el.data('fileinput');
            if (self.isUploadable) {
                self._clearFileInput();
            }
            if ($el.val()) {
                $el.trigger('change.fileinput');
            }
            return $el;
        },
        zoom: function (frameId) {
            var self = this, $frame = self._getFrame(frameId), $modal = self.$modal;
            if (!$frame) {
                return;
            }
            $h.initModal($modal);
            $modal.html(self._getModalContent());
            self._setZoomContent($frame);
            $modal.modal('show');
            self._initZoomButtons();
        },
        getExif: function (frameId) {
            var self = this, $frame = self._getFrame(frameId);
            return $frame && $frame.data('exif') || null;
        },
        getFrames: function (cssFilter) {
            var self = this;
            cssFilter = cssFilter || '';
            return self.$preview.find($h.FRAMES + cssFilter);
        },
        getPreview: function () {
            var self = this;
            return {
                content: self.initialPreview,
                config: self.initialPreviewConfig,
                tags: self.initialPreviewThumbTags
            };
        }
    };

    $.fn.fileinput = function (option) {
        if (!$h.hasFileAPISupport() && !$h.isIE(9)) {
            return;
        }
        var args = Array.apply(null, arguments), retvals = [];
        args.shift();
        this.each(function () {
            var self = $(this), data = self.data('fileinput'), options = typeof option === 'object' && option,
                theme = options.theme || self.data('theme'), l = {}, t = {},
                lang = options.language || self.data('language') || $.fn.fileinput.defaults.language || 'en', opt;
            if (!data) {
                if (theme) {
                    t = $.fn.fileinputThemes[theme] || {};
                }
                if (lang !== 'en' && !$h.isEmpty($.fn.fileinputLocales[lang])) {
                    l = $.fn.fileinputLocales[lang] || {};
                }
                opt = $.extend(true, {}, $.fn.fileinput.defaults, t, $.fn.fileinputLocales.en, l, options, self.data());
                data = new FileInput(this, opt);
                self.data('fileinput', data);
            }

            if (typeof option === 'string') {
                retvals.push(data[option].apply(data, args));
            }
        });
        switch (retvals.length) {
            case 0:
                return this;
            case 1:
                return retvals[0];
            default:
                return retvals;
        }
    };

    $.fn.fileinput.defaults = {
        language: 'en',
        showCaption: true,
        showBrowse: true,
        showPreview: true,
        showRemove: true,
        showUpload: true,
        showCancel: true,
        showClose: true,
        showUploadedThumbs: true,
        browseOnZoneClick: false,
        autoReplace: false,
        autoOrientImage: true, // for JPEG images based on EXIF orientation tag
        required: false,
        rtl: false,
        hideThumbnailContent: false,
        generateFileId: null,
        previewClass: '',
        captionClass: '',
        frameClass: 'krajee-default',
        mainClass: 'file-caption-main',
        mainTemplate: null,
        purifyHtml: true,
        fileSizeGetter: null,
        initialCaption: '',
        initialPreview: [],
        initialPreviewDelimiter: '*$$*',
        initialPreviewAsData: false,
        initialPreviewFileType: 'image',
        initialPreviewConfig: [],
        initialPreviewThumbTags: [],
        previewThumbTags: {},
        initialPreviewShowDelete: true,
        removeFromPreviewOnError: false,
        deleteUrl: '',
        deleteExtraData: {},
        overwriteInitial: true,
        previewZoomButtonIcons: {
            prev: '<i class="glyphicon glyphicon-triangle-left"></i>',
            next: '<i class="glyphicon glyphicon-triangle-right"></i>',
            toggleheader: '<i class="glyphicon glyphicon-resize-vertical"></i>',
            fullscreen: '<i class="glyphicon glyphicon-fullscreen"></i>',
            borderless: '<i class="glyphicon glyphicon-resize-full"></i>',
            close: '<i class="glyphicon glyphicon-remove"></i>'
        },
        previewZoomButtonClasses: {
            prev: 'btn btn-navigate',
            next: 'btn btn-navigate',
            toggleheader: 'btn btn-default btn-header-toggle',
            fullscreen: 'btn btn-default',
            borderless: 'btn btn-default',
            close: 'btn btn-default'
        },
        preferIconicPreview: false,
        preferIconicZoomPreview: false,
        allowedPreviewTypes: undefined,
        allowedPreviewMimeTypes: null,
        allowedFileTypes: null,
        allowedFileExtensions: null,
        defaultPreviewContent: null,
        customLayoutTags: {},
        customPreviewTags: {},
        previewFileIcon: '<i class="glyphicon glyphicon-file"></i>',
        previewFileIconClass: 'file-other-icon',
        previewFileIconSettings: {},
        previewFileExtSettings: {},
        buttonLabelClass: 'hidden-xs',
        browseIcon: '<i class="glyphicon glyphicon-folder-open"></i>&nbsp;',
        browseClass: 'btn btn-primary',
        removeIcon: '<i class="glyphicon glyphicon-trash"></i>',
        removeClass: 'btn btn-default',
        cancelIcon: '<i class="glyphicon glyphicon-ban-circle"></i>',
        cancelClass: 'btn btn-default',
        uploadIcon: '<i class="glyphicon glyphicon-upload"></i>',
        uploadClass: 'btn btn-default',
        uploadUrl: null,
        uploadAsync: true,
        uploadExtraData: {},
        zoomModalHeight: 480,
        minImageWidth: null,
        minImageHeight: null,
        maxImageWidth: null,
        maxImageHeight: null,
        resizeImage: false,
        resizePreference: 'width',
        resizeQuality: 0.92,
        resizeDefaultImageType: 'image/jpeg',
        resizeIfSizeMoreThan: 0, // in KB
        minFileSize: 0,
        maxFileSize: 0,
        maxFilePreviewSize: 25600, // 25 MB
        minFileCount: 0,
        maxFileCount: 0,
        validateInitialCount: false,
        msgValidationErrorClass: 'text-danger',
        msgValidationErrorIcon: '<i class="glyphicon glyphicon-exclamation-sign"></i> ',
        msgErrorClass: 'file-error-message',
        progressThumbClass: "progress-bar progress-bar-success progress-bar-striped active",
        progressClass: "progress-bar progress-bar-success progress-bar-striped active",
        progressCompleteClass: "progress-bar progress-bar-success",
        progressErrorClass: "progress-bar progress-bar-danger",
        progressUploadThreshold: 99,
        previewFileType: 'image',
        elCaptionContainer: null,
        elCaptionText: null,
        elPreviewContainer: null,
        elPreviewImage: null,
        elPreviewStatus: null,
        elErrorContainer: null,
        errorCloseButton: '<span class="close kv-error-close">&times;</span>',
        slugCallback: null,
        dropZoneEnabled: true,
        dropZoneTitleClass: 'file-drop-zone-title',
        fileActionSettings: {},
        otherActionButtons: '',
        textEncoding: 'UTF-8',
        ajaxSettings: {},
        ajaxDeleteSettings: {},
        showAjaxErrorDetails: true
    };

    $.fn.fileinputLocales.en = {
        fileSingle: 'file',
        filePlural: 'files',
        browseLabel: 'Browse &hellip;',
        removeLabel: 'Remove',
        removeTitle: 'Clear selected files',
        cancelLabel: 'Cancel',
        cancelTitle: 'Abort ongoing upload',
        uploadLabel: 'Upload',
        uploadTitle: 'Upload selected files',
        msgNo: 'No',
        msgNoFilesSelected: 'No files selected',
        msgCancelled: 'Cancelled',
        msgZoomModalHeading: 'Detailed Preview',
        msgFileRequired: 'You must select a file to upload.',
        msgSizeTooSmall: 'File "{name}" (<b>{size} KB</b>) is too small and must be larger than <b>{minSize} KB</b>.',
        msgSizeTooLarge: 'File "{name}" (<b>{size} KB</b>) exceeds maximum allowed upload size of <b>{maxSize} KB</b>.',
        msgFilesTooLess: 'You must select at least <b>{n}</b> {files} to upload.',
        msgFilesTooMany: 'Number of files selected for upload <b>({n})</b> exceeds maximum allowed limit of <b>{m}</b>.',
        msgFileNotFound: 'File "{name}" not found!',
        msgFileSecured: 'Security restrictions prevent reading the file "{name}".',
        msgFileNotReadable: 'File "{name}" is not readable.',
        msgFilePreviewAborted: 'File preview aborted for "{name}".',
        msgFilePreviewError: 'An error occurred while reading the file "{name}".',
        msgInvalidFileName: 'Invalid or unsupported characters in file name "{name}".',
        msgInvalidFileType: 'Invalid type for file "{name}". Only "{types}" files are supported.',
        msgInvalidFileExtension: 'Invalid extension for file "{name}". Only "{extensions}" files are supported.',
        msgFileTypes: {
            'image': 'image',
            'html': 'HTML',
            'text': 'text',
            'video': 'video',
            'audio': 'audio',
            'flash': 'flash',
            'pdf': 'PDF',
            'object': 'object'
        },
        msgUploadAborted: 'The file upload was aborted',
        msgUploadThreshold: 'Processing...',
        msgUploadBegin: 'Initializing...',
        msgUploadEnd: 'Done',
        msgUploadEmpty: 'No valid data available for upload.',
        msgValidationError: 'Validation Error',
        msgLoading: 'Loading file {index} of {files} &hellip;',
        msgProgress: 'Loading file {index} of {files} - {name} - {percent}% completed.',
        msgSelected: '{n} {files} selected',
        msgFoldersNotAllowed: 'Drag & drop files only! {n} folder(s) dropped were skipped.',
        msgImageWidthSmall: 'Width of image file "{name}" must be at least {size} px.',
        msgImageHeightSmall: 'Height of image file "{name}" must be at least {size} px.',
        msgImageWidthLarge: 'Width of image file "{name}" cannot exceed {size} px.',
        msgImageHeightLarge: 'Height of image file "{name}" cannot exceed {size} px.',
        msgImageResizeError: 'Could not get the image dimensions to resize.',
        msgImageResizeException: 'Error while resizing the image.<pre>{errors}</pre>',
        msgAjaxError: 'Something went wrong with the {operation} operation. Please try again later!',
        msgAjaxProgressError: '{operation} failed',
        ajaxOperations: {
            deleteThumb: 'file delete',
            uploadThumb: 'file upload',
            uploadBatch: 'batch file upload',
            uploadExtra: 'form data upload'
        },
        dropZoneTitle: 'Drag & drop files here &hellip;',
        dropZoneClickTitle: '<br>(or click to select {files})',
        previewZoomButtonTitles: {
            prev: 'View previous file',
            next: 'View next file',
            toggleheader: 'Toggle header',
            fullscreen: 'Toggle full screen',
            borderless: 'Toggle borderless mode',
            close: 'Close detailed preview'
        }
    };

    $.fn.fileinput.Constructor = FileInput;

    /**
     * Convert automatically file inputs with class 'file' into a bootstrap fileinput control.
     */
    $(document).ready(function () {
        var $input = $('input.file[type=file]');
        if ($input.length) {
            $input.fileinput();
        }
    });
}));