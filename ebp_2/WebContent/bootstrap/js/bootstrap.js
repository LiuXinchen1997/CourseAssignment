/**
* bootstrap.js v3.0.0 by @fat and @mdo
* Copyright 2013 Twitter Inc.
* http://www.apache.org/licenses/LICENSE-2.0
*/
if (!jQuery) { throw new Error("Bootstrap requires jQuery") }

/* ========================================================================
 * Bootstrap: transition.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#transitions
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd'
    , 'MozTransition'    : 'transitionend'
    , 'OTransition'      : 'oTransitionEnd otransitionend'
    , 'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#alerts
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent.trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one($.support.transition.end, removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(window.jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#buttons
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element = $(element)
    this.options  = $.extend({}, Button.DEFAULTS, options)
  }

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (!data.resetText) $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d);
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
        .prop('checked', !this.$element.hasClass('active'))
        .trigger('change')
      if ($input.prop('type') === 'radio') $parent.find('.active').removeClass('active')
    }

    this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
    e.preventDefault()
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#carousel
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.DEFAULTS = {
    interval: 5000
  , pause: 'hover'
  , wrap: true
  }

  Carousel.prototype.cycle =  function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active')
    this.$items  = this.$active.parent().children()

    return this.$items.index(this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getActiveIndex()

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid', function () { that.to(pos) })
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition.end) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    this.sliding = true

    isCycling && this.pause()

    var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })

    if ($next.hasClass('active')) return

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      this.$element.one('slid', function () {
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
        $nextIndicator && $nextIndicator.addClass('active')
      })
    }

    if ($.support.transition && this.$element.hasClass('slide')) {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
        .emulateTransitionEnd(600)
    } else {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger('slid')
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this   = $(this), href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#collapse
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse('hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')
      [dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('in')
        [dimension]('auto')
      this.transitioning = 0
      this.$element.trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
      [dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element
      [dimension](this.$element[dimension]())
      [0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    $target.collapse(option)
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#dropdowns
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle=dropdown]'
  var Dropdown = function (element) {
    var $el = $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      $parent.trigger(e = $.Event('show.bs.dropdown'))

      if (e.isDefaultPrevented()) return

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown')

      $this.focus()
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).focus()
      return $this.click()
    }

    var $items = $('[role=menu] li:not(.divider):visible a', $parent)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index=0

    $items.eq(index).focus()
  }

  function clearMenus() {
    $(backdrop).remove()
    $(toggle).each(function (e) {
      var $parent = getParent($(this))
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown'))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('dropdown')

      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#modals
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options   = options
    this.$element  = $(element)
    this.$backdrop =
    this.isShown   = null

    if (this.options.remote) this.$element.load(this.options.remote)
  }

  Modal.DEFAULTS = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()

    this.$element.on('click.dismiss.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body) // don't move modals dom position
      }

      that.$element.show()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one($.support.transition.end, function () {
            that.$element.focus().trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.focus().trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.focus()
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that    = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      this.$element.on('click.dismiss.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade')?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (callback) {
      callback()
    }
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal

  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option, this)
      .one('hide', function () {
        $this.is(':visible') && $this.focus()
      })
  })

  $(document)
    .on('show.bs.modal',  '.modal', function () { $(document.body).addClass('modal-open') })
    .on('hidden.bs.modal', '.modal', function () { $(document.body).removeClass('modal-open') })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled  = true
    this.type     = type
    this.$element = $(element)
    this.options  = this.getOptions(options)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focus'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay
      , hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.'+ this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var $parent = this.$element.parent()

        var orgPlacement = placement
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
                    placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.$element.trigger('shown.bs.' + this.type)
    }
  }

  Tooltip.prototype.applyPlacement = function(offset, placement) {
    var replace
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    $tip
      .offset(offset)
      .addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      replace = true
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left < 0) {
        delta       = offset.left * -2
        offset.left = 0

        $tip.offset(offset)

        actualWidth  = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top')
    }

    if (replace) $tip.offset(offset)
  }

  Tooltip.prototype.replaceArrow = function(delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()

    this.$element.trigger('hidden.bs.' + this.type)

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0]
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth
    , height: el.offsetHeight
    }, this.$element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(window.jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#popovers
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.DEFAULTS = $.extend({} , $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow')
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(window.jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#scrollspy
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var href
    var process  = $.proxy(this.process, this)

    this.$element       = $(element).is('body') ? $(window) : $(element)
    this.$body          = $('body')
    this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.offsets        = $([])
    this.targets        = $([])
    this.activeTarget   = null

    this.refresh()
    this.process()
  }

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = this.$element[0] == window ? 'offset' : 'position'

    this.offsets = $([])
    this.targets = $([])

    var self     = this
    var $targets = this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#\w/.test(href) && $(href)

        return ($href
          && $href.length
          && [[ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = thisx[’¿_Õ*IÇylØ…¨œpO€ñı0™;ïÚºâFé·`*ĞFÄ2Á·#q©’ë6ıQFOæZ¥‹“Yz
ìŸ“–0¡µé¬{6¯j(º9kÎÁƒ\©gvÖXú»IiéT­k´F£Œ‹–@\‰ßÔ ¨2Æ™Œ7Fr­!.<*oéu• è».B¤¦òÁ÷—ÕHÙ³çˆÊ¨Ñğ¶A¾¿Ô-×vkn¾“Ò©¹º±=NìÎ—–¡XImv/z$²¼­Šh@òq>J´d—Í|>rF-)€àÿ®’šãE°wVƒ>(å`ÄRîÍ™=?¬È¯ùé¬Š¶VâÌ ÿlj•%[”u÷¦ãÕı9ø£jm Zê¿èoÚŸ’Ae¦x¼¯c§)F=/îÑ	_îe?øFP®ÜU-Áàª9š¨¾µÇMnnô"‘B9äòõŒs“®c`VÖßKw;.tôlh…µzÆœjÌÖ#60fsN{Ú† €.ÀµôXYÑfÈ¦xxÔ¼hj„êéÉ%zÌá7!×´ƒÊİk
¸Ëø NˆŞÃF}!ÍF3Vzj°ÀxIT„¾±ÌØ%z€µKHuW»×„˜î¥Ú¯ãHÎ›“DÙ~½çş1ó«'µjåZ|ÂºA ›WY©”qçÉM[ZÎWşÁ¯ÚCG£±¤¾i¶«-n,/¼q‚:/c_tñ÷ÅZø1u¯0Åé?ùºQÉÇjš‰‹;˜æ¬¦ÅJxñbŒ_·ä˜ –åÜöDszÂXjTÍĞ–ÍF …géÀ³lwÛñ2Àrÿî_y.¼r&jn¿px‰[„œÛyÈ¯ZãK›õË×¸K˜ÛİÛ7³FîÉ.™K«‹Ü4Åüt‰Å• Ù—ög¬ò,‹Òú¬ô$#§ìûëM9ìü7ãP%´Ü‚
¾öš-3 ZKqUëp5îØ‹Î%¡ë<³ñ€Álò‘š®»l.Âğü®Á[Ò»yXsZ=×ÃŠúpÒÒ^Õ¯Ùñnøø©¦e·Äz;J·ò?tÚâçí—õî!W³€4*ÇpZ‚.¤³¨JéKÀLÑã_!I,a™ş'Â1aâVæbÍø„~£äJ¦‹ø`!\Gj©­Ìm")“õp¡c`0°ä¥8	hşRaRÑE¥šb\b7ÁB[Í!…fŞ˜ª>‘’£¬ÂqÛ¿È¢íµpL"/”‚Í=!g÷¼m04•¥öñÛ§•åEKì‚Â«àk½$Qe´İH9àÊ©Š=¡œ¸ñ<ô'?+vïo¾ y‹Ö\µç,q¢tyÂÀ{UšyŞ‘ºUà5íüZ£ĞêÔwh6F››9ùKµBårû«ÈVƒõ(=Åp‡H{œ­çô3WşûÿVË@—¬¢¹ŸÁ·£„@cJlñT$‹&!É5v¾f>Î¿DP=ç(¥§ÕÍb<iBZ!pŞÛÍ×¼ŸÃ
göîñE2Ê‡cæã{O7…¹hÌ]œ¼ş3ğı”AyWüt[¼©º=¼Ã=”ìLë›„¸¸ÌWÏA7Ü_ IföÅÃx"ÿÏÑE25ºÄğ¾¾×#ÉÈÓ1¥[‹Êˆ Kk9Öá9¬¤³çS€á]´,Ç\Ê²shÖ'9í[ÁÂ+_Ì€ìœ¾m¶Gñ4ÕÖŒ©/ğ+]ííşmæ‹Ñz´ºXC‡»´sŸó¦>rÎv?íBy[
3Õ²q×¯ØøRL›„¤›T t@0udË¶šŸuè!0æ,å/Ì‹xè*Gª*»²Ï´ ªÚÌÒâ’ùXaš5æMàZ£˜êázÕÇö*\z¥ø#)£ü\'UÔr[Öï‰¥é9šLÀ[¬-úL(\—êd-‚ÿy,LĞR{?÷;Ôó@‰WÏ=…êSZ´.<¹~FßR¦A½†ã
Ü“øÒŠï‰„ÿÇ¯‚öÂa^téb—(´ıÃÛ%~Â wf*·Õ 7øÁ¤ÅcßÏLõ6-¤mr†dñaÙ¶ã•Ä^tQ7³z|aˆZbĞüHP¿ÙØğæ~N#{ÿ½¯oœ¤Ôy*"[ó\~ŠG„2äÌOr¿˜iò˜Ãh›1fcåkFåİî„Š}Sœ"c™¥r]ìıÜË)lÌ¤–laQã ˜4=Çô_@œöÌ%ÊÛïP8Ùù×~/O•Íj¬ÓÍìÔyÂô°1±h…[À vÜ€sÿú$c?XĞ2÷ ÿõ­U3U;NOë[uR—‘‚­Ê¼¨¨8Ä¾3aŸQÌjÇà9®>(¥IÒrÍ¼ wˆ—&qpSÑõµõÁhÄiã–o´ßŸKMcùØš‚Ğï¾5ÚNì¶”n±½ÓçM«…P28±›6ù?`Ã"¬gcÒÄŸ5¡sY{]ûMŒeÁYOz¹å×jT·Kº‹¯9\s ®Êï8÷l¶…‚wÀ¤´0ì;ø›
§Ü(^'FÖiTîÏĞ¾¨*‹Q¨ş¡=ÿ¥¸ËçP5‘›ZÏÕxUCG¾ıüèWcî›ÙÄL¿*Ğ¦”‹éÃ™¤6ŞÈø7Â¤U·SGß˜vìsƒZ>!¡Ë©¨çÃ’ ïÔù5lêaN­M3¿-ûÈCx
â8iÌåLĞŸÖtbH1}Rg-Ñ÷cP¬}S‹0H,F¼´FòLÉïm¢Læ/hIo^RLæGs6·Q8£FJ@ü­iàr¹ŸÙºùÉN]"+4µä¸|Ø.nÃ˜şş9–ß†‹)"ónÆ^Vk®Ó®AXÖÑ:™-†“áX7^åÈ¿Ä¸´"À,DÙÀ9æN™I¹ÔœGğÊoÀ2®ÍùE‚7’/ååBú¹ÔÌÚ~Hç"?ó¦]åêhM/ˆ>ĞüÿR’8s‹!O\*\UÃå¼µ_er	%:¼ÄÚŒcfLá3PüÎ&yÎ“šê’
Êı 	Ó[w€xÒ	wµæ°VÏÖ@F?‰ø»øÙ²Ä8X™mªxNâC¨´Ï+M6K<~ÒÊ]E"³ékoú° œ x¦*ìöcš·ğÕ¼tÍf…ü'œîÚÍ¯•é;±°ªØısÎ©×š¢É÷³t¶jqX(wJ0L3Ê³†)$`|‹…r§ï4e&BÎø°»‚Òº%Ÿ³÷Y¼hV	±Uö‹¥6„á?Ë^py1.¼GTÿ"Ái9·ş7É@çl‡“$ºË5‘øuu½	dn>¨¦	âòl‘šr#Úô—“ÂìÄĞT5›Ñ±ºŒ>8ƒÀ%˜L¿^ÆÍıMJ6‰xw)VÙïo75ÏÚí5¶sƒa[KD.T•şßzÏnıö–wAéóõ&„`¤x7`Ë€Î³7Ô‡¦PÛtÁjë‡œA'’9’‹ì%åB½ÀN{I«Áíî&5)î1ì³oMkĞ¼,ïä\ïå½J1šÅmm©ÙÖH5‹óéî†ËBûA"KmÄnjÄJ‰š«K	p€®	3â“(£#’ZZ„©ëB Ïé¢§^(õOhŠÚîÎ€û˜ë-Ë/!™ƒ‡½©¨øôÄ‚ÎàPœYAÃëñö)ğ^ãB@Êfo$sÀÕË!æ›,?é­	«lë¿À9Ûw¡]Ûp‰W?‹ÄWc›flÁ­dü8€‰í*ì‰¥”v ç>Ô*T…ëú¢Òã&TÉw!üÑ*k_^¸æ¥»‰Q…j¤ÎdÖs‘ª; ]ÀwŞÒ¸Å¢È§ş¹“;¦mÒ‡å–½T	#ì~+KK¯·†2vÀ£³Ï³¤ËcòN¶Å ²&Ê÷S%Œ›C›$¤Bñ)ú‹y§‘ÀÉkÆkPUjˆ¹*h(c¹…7²ÏàñB²,™ƒp{  xV{ùCË¹óù‰×WOğ@ä*mà!ßÂv	"1M@	sÙ(àÀğWL…Si+ øè#=œ_áŠ”òui¬Ø4 #’÷•¥Iı6x#ğà¬hÙÓc‡:à•»4ìÅTóğæÕïd®2Oi¸	šŠc,GÈét!BØau½Ç·˜ÃdeB,ã ø€ÍrUÔÚ|àçœ®ê"Y²äÄKö¤¸Ã0ÅJ•ıÛô™ÀÒ6n$U¶ïşg\.ÿÂA€´–40M¦L£¨§Ú½ ±´¨é°‘S#0<Ğ…Ú9É¦P¥È™ş'Úû^+j5‚°]ô…(¬öl¡º¸‚³òY8èÕ¨z¯Jˆæ9Ÿä3^¯–ÏçÎ,q ˆ£æõ";g­¾Rg ºòüÎß@°v¸+Õ<p¾§TjàU¹™åñxOe:cvJ‚FÍã	œî¬®‘GG®åmª¥VNªš+®oå›ÿp­¦ûŠ[¹¨Üu]fHŒE9©ªE×ç‘&›U‚|Aê+ÔY·ƒaæ+è]AjËL<ä2¼tú‹eC`¼7;õ«IÌ1¯í»XÀ ¡e|{±5qZı9yM@M”B«Ø:°ì¹L¸å+¥ØŸ2"¦”È‚Ã‘ş¾úàt*Ò–øÑ¸QÚ½Ÿ1œP>OŸırğûo!N¢ŞÍ(¨€/èÄ€<­ƒ^ïrÄdˆ6¶òÿˆBßÉşŞ¥i$‡ê‹ƒò#AÔO\š¤ŞˆÒ^Îæ‘Í3x¯>û‰±cÏÜAÀ4ğ
^^~Nñj.Ôš‘¹«¦{sŒ™qCb#mW×40p)5vSdÅ®?˜Ğ‡Rİ¡w~ÉA•ê§Âœ[DpHTl‡É3CV°®	Ş(¿/ÁĞ/“pîrRğg~Ó/q5ã«¬ÈF‰AŞĞlt8š~MÖàÿëI*”ûå5ãÀ-P½ŸÜiÕ_üŸs­²¹VmÓ/ËĞÿUÂÅ¡gVBú¡ƒ¸7ï—¥>V¡‚§§˜aA²ò®5å%zeÜtÌÎ·1NZâ¼f4JãÕq
§ÏüöÇ„P£áçêjDu˜0œî÷¦¨<G„Ä(DÙîŸÌîÍš!}4B:Rf¤jfô¬)¿ºğÎ±fï
gÔ*´ĞªÈ»”
ÏgÙÖ„èU!šš¥PÄÛy)f)Sñ"!Îô«’D%qÈn¸nÙD«Â©À‰F³Ê'ª¨SD;rVª—üZÔ+‚,º[G¸«Tç«€Óá—×ÒTÑI%$½Mà3:‹´™Ä®¸¡\=ğê¢iúHÜ!¬ñî¨Ş‡¨h¿5MUG]ÖAÙI© ê$ñï-ï¸V?2íjà‰+,`‡(ûî×üj˜Îz:EıN/\@ØeûÃ/ØŸ„ôù,ííYfBxİ¾´¸T7ôIË9*çÁ‰-ÅçîŒ6Çö³¶(fı­|M¿¬•æçíŸm–ì­©Á»¸J¸Q8¨—§1656ßUyG3‚S§2^:ğÕé¸']ç»Ç•ôXzLÈ…E×‰µÏ~œ3$n‹ç@ç2û"ñº­÷ykGçW.{=’ã2‘¸údøå]ÌwŒá´d~ø¾’BÏ¾NYn‚ [ş-Ÿıüo	3Ú$A™EÔ­ñ_W|YZvE$_Á1;}¾têCaŠ)ŠÅ}©ô*±(ÚYP_Dêëùa”®ŞÌÆB>ğ~€ô¿mÀÊ¼M!Ê®¯C`Î·†#ÌN ‘yz†ØÈÔCü„Tşø`Á^Ğ×b×Ó &ÆOFo¿ÃrúK, jÎ ÖG"Jm§¬¾A ùÆ“OVr¯©]upÜ¸	’òeb1ï'òã±ÉOBÆöœô¹Q.*èf®©j5„$£*À`:}?…A*",û¹ˆzO°˜=z-#uÄV’Ù4C¢hL±š|âŠšÈã`¤:•_ˆ­ª5ÿáİx„¡„›XÄç%xUbdçÚ¡ªrîÙnƒ¥øÃÕ&¶òùFt"»Îso¤	ë§¬tß4ùZ<‚‚YLß–Bßş—v+‡ÚËHKDñrßÀ¾A–2x<—YÛì}>Â˜c¬fkn‚+ö×"wÛëÅIcÎÜYÒÉÆÚ•Ìş«ŠŠµ‡ÚrºU3ñÕšQq3'ø7*'ĞâÀ^z5ÛŞ²lZO‹£D‡ˆ_-Ûı!ï©2bàt¤ts¼b=ÿ¨:q÷¹ä}%äH¶±ÛÉn'y‡2LßUÀS5ÍçÍq[M·Œù'Œíä‘¦Öˆ
…áøoÁv(3O’ôBÊ`óxW—•b¤FerŒƒØ»I~h8šèPßŠÈ/¢;½‘y0ÿYGÁ®Ş›6Ç9æíÁœ)áèØá¯âÈH›ÚÜ¦‹Ù‚u\¡j÷!9ÖéÛkâÎt9‘—hM‰-;_D%?…¦¥Á~†yámÌõdò{47§´:¢®Â«œİs¢¯¶y*ïp"™49õ`WòÚÙİ‡ .ßUf.wÿ4ğ¼ù$QÁl|ĞÌ¯•%à¢m¾d@îšæR¨H£<³ß‘óÈq¬ÂÈÿ‘1€7ø×Ø§â6§"œmù£Ë4-ÆÊ›«W)HY‰ş.FFWeˆZFÊSŸhøˆØ7GzCIŒLB€…&¦ÛPuı$ºªg­Ş˜6<
‰,_r8aeÿôA¢ºÌ66Op°šÃwğ£Ÿ I¦XÅè-åÍİg„û}·h®Ü‚O/&}¼îôd³ŒcrU»Ş×s$I2Úg6à´qq)W¹şVd?œÍ…(eSÜçÚ«@¡«}½$[¡YÃ}§Õu~âx]'±|ÜçárQ¡ƒ¾},æ¯”² ;´wHúÚİŞòóJ!60G
N×ËÖÔÿ“ß•şÒ2BdhË¸<†zÇsh$HÆM\ì3“ÓNÔ§Ø%×ëÏ‘|_yÑN
`Ø­H`ŒÆ:Iñp/Ï*œ6Ö6a…5~+:m&/hoxÛ“§Á÷ƒ£. Ñ÷ˆ‹¢%#Ù«wh³òuwLí¿Ã{“n~I”>€MÊ,|…‰¬dø˜8Rµ¦u—}’Í¾í‡÷)€—¢µ5Ib,3VêĞ:l,ìh”áY>Ó<_¶$çL{¬šéL¸Ùa:šğ[’‚öw¯’ŸK3TQÕ/™‘zbæ­QĞBrMÅ+rÌÂ'Å:Uâ
Úß+N4ì©®$š…ñ>ƒmkğ‰=LÉÜ‡3Š˜ï}s.hª%)Ğ_äz²ãĞ«ù»¥•äjÅŸ_îÔl°zÖ…hL0™6…ƒÇ9DÇtú”xkzµ5V¯K[¥6Ù-‰3Çà‘2øw‡¦Uÿ¿:¯Ìlãñ7	É8ÊñÂsTcUXnØ.×MvH³øĞ‘zvåM.ÿ"g×hëëÿGËÏ¦%Å´í}ÇET%={AN8·œ¯e†ôiÖÈ€PT€:Mqı³´Ú×;J…DŠœ|s·{}xğQä>€Å|kÃmtŞ%5Hë·Á~û)!²¶[ä£Ğ¬Íèÿ>D3\óqğï­µ-Gïï©û]Ï.#!fˆ<³Xªœ7FOôbÈş=¹9Ej‰âzNûIÌU˜p´¨ ÒIÄú¡ëĞ¥—û¦ÉdcÖ^3äñ¹ãÕ’òfôçÍ:ZóLu8:
İqˆ»:Y˜ÊIwˆË&wäßù<µ	äwºIÔLÀÇXˆÉiJ_Œ“.[Ï:_áq'*ÌãĞŞxyá(BğvSÃ˜VÎ“nãÈ2ÍöF•36³ñë@~Å€·qÈ	“Dƒq¥% hcwöéûá¿3F¥ñôx›yç ­¶nú-QÜ`Râã‡ı,*b‹Rc\®İúBìƒÈ1˜šI	S_äHßö hÙäz1—-u°§ƒa ¹ı ÑX<‰ªTRC÷'®Á½ï¶ÚT^­ìõEàÍË[®=T Œ
ùû3ZPXõ´{—©Iá·¶×]jÚ½¥W“—–óuŞCŒ‡zJZïÆ[Q#ôÌÆƒ›ÜàG<ü8e6%ƒÖr{¤`t9¯É¨‡Y$ìXşr|}‰Î»¯rLğj_L@>Û¼UVc»á?dçCp‹ÁÑªRx@l•Iøª”O4[úpƒ¢èH(Î—?Kº÷‹hLcÍö4–N-RãXä·[w½2KhÕ÷ş8ÍÏ|€oáÔósÌO_÷ºY2q^ü:³pÚàÂ¦£ÔÂ5¦)~Ä÷%†¿Ş+“ QæŞ¬”´ÔÍ¥…—[€Ê¹™%p˜ @Q©J¾U±ä¶°eüFy1Mâ£DoœRI+&Bn-|¦e5„U3¡«h¾3”ñ€–çŠìl¡|îÿq–Và@G¥”aGİ¶¤|ŠØš6¥5Çyë¥÷Sò"¦<9İâÇˆt;e!7\Šeí)éqJîÓÙÏhÁS“b®ÇRxy7† 2T3@ÜgSÚòö:'gî»®ùiZqJW½çx"Ú»à¯JApŞ•Â¦.0xÛ"¯v¹1*6Ïqâ=¢ÄÅ€Óƒ)ğ:õLDô
® zÒRK{H“– ÓŠ…É˜ªFÅâñ;vŠïLØ^aAÅĞîP´ l»uáƒHªÍÀ¡ïºS¡¥ÕSAk¿)™t»aÍÒ¨]ÑÊv9r@h\M¿tÉ8¥ª`u2O¬caÈ²Í.xÓ›ÿŠ¶n²1òg´*
“:ÕÜ€x²Åeî‡À÷’Ü¶š.¤†ôS·û\@cæ·ú†w´h'×¡Â0~™‘ÿ¢Y¸dJu£±H&ŞŒÂï9ıD¦ÿ²YfÊ&µĞÛDYê*î…®vÅŒWÙ³{‚½~‡ìş÷í=7Í´Bs{ÃÕÄó6×¥À}:×ÊC¡,ãk"éÜ{TÀa»æR<j~½ÊéCÍØJ\™ğUì‘¹Wç…¢¥ôêHSKGámkQŸh×ô)ÚE†Æ 'T°â*¶Ğwm¦S¨SS»XêsJïñh>¥Î*Ì^õe b¾	DQAA6~mmºp·£­«Wcs7¿jqe#(Bn#œÍ+,å!‡W±§T¢uÕ¥6Ùò–g®é=’‡L<É$ ±
¹œ)'šChª'µ?´Êö2ø ´«bt>¼ê œ5&§¢…Ø>‡¤{:®·î!Úä9
§·¢òÇc®õ‡(³-|P 
}2‚ÔO®?Â$N¸­: ¢/$¸ô1™¡9Ÿ˜¡„JbÌ+¸GmXü”u0\  ‹	¶½ç
×¼¯ezäM6”çFşâ–gª;Œ'1eœks.T‹ÇÈ„ù—›R0«Á×G“÷ê1¶¼&|æ‚Œı¿?¨[ïkĞ*VIR© 6cTm
‡äKX–æx/"mfëZõJ@º}ÆD2®xp§˜u;ŠöÎ1ÑwCZ&óêÉ¯!•…ª×=kê”e½Ë,ú#ß$f.¡–¦§V=¶`N%¤p­şTºnìÌ…›¸.î xîè_@¡Ù3Û‹+2÷â¼Ò]Fon½PŒÎÛsu\4šÀî²â›İºK;keÅÖœGƒ›©ş=ì…4ÀÉG+z>XÊ°Êè§T={Ş×	Mj¿–ıZˆljr…¦K ÇÕš>:2Åi°´Uç±§7­~Ü¯“U¸í2Ë%PÀXÊ);’¤äcæ¶ßKk2š² q&3³ıv>’Ê´èbÄì»r\’s%jMŠ\íZÃ™oföïø—#$`tÔÁ\H °•I›òª´Œ*yÿ««ß-@Hx±¦FsÍîÚÅ³c:'hˆ£{O—Óæ¸Ê«èaA³¤úsê"îÀ^ØƒËÚ0§G'¸NêC#Rä»ÕÙÛ(â,`ÿò†_¹kjœ€ô©ĞŠD%¬»ATĞeÌYëWœÃ=5 9™[Ó* á rËKáúV}NôgéuÄânjFªÓ‡¨zcViY¸7ãe³œ…¨—ù¼‘!c¿¼'m9v®«µËnjXÍŸúƒ‡µôö„M¥E“ešlH¶®Jt€Ù`7Yr&ögA¹…U©ô©ñİÑb”,š†‡x‰Y¤èy±1õmß«,dš	R ¤MÓ«9W›¹²£Òõbd`èªjºy‘g£nöébCÛŸJ»ãşÁ¨²¡ƒ±ìá2…†Ui ›“¶ø¾I*¿+k!5h¶é¸èñ½Z%L™~$.º}¢á³ –“·VZËä4Iš/Üî_sŒ1~‰Ü‚¡lì‡ñxåİ²}q`¦àë4­KjŸ«Ãæ.èùij„ìViâó'L›ËHÕx‹wßÃª÷IV{ØÓ¸ÂŒ‡l’“(
oî9¦n+ô7f()(@â2[ÖAu7îÙ©ÛƒæJº—ÎÉ8b•&ÜÏÎ¦Œ™VeO÷ßbNVO5€ ÖQ¤¾ß«‹Æ¢™ ôZºÛñFt—jc÷Ş ğ^{6óf…ê½qõÙüj›©Š‹VÀyëFO2$ ÓAï\è=9Lª1pud}»ç±¢D?ÅF[P»¡ŒÎÆÆı?aew±ÆHGê¸M`Z±øåæËu¿…ÅÖƒ
ƒ×Å1é¦ @.œ¼^§ÅŞpá}NQ<,Ö¦¤«½pŠ æhåœe„Ó2Ö4‰Sjw¯Á	†ôKxæûÃmZ§ŠX\ä§uÛy¨ˆ~[MÿNÄTä9&	IÍá€Ûîà£7
ıS™§n¯pÄœx[’¿_Õ*IÇylØ…¨œpO€ñı0™;ïÚºâFé·`*ĞFÄ2Á·#q©’ë6ıQFOæZ¥‹“Yz
ìŸ“–0¡µé¬{6¯j(º9kÎÁƒ\©gvÖXú»IiéT­k´F£Œ‹–@\‰ßÔ ¨2Æ™Œ7Fr­!.<*oéu• è».B¤¦òÁ÷—ÕHÙ³çˆÊ¨Ñğ¶A¾¿Ô-×vkn¾“Ò©¹º±=NìÎ—–¡XImv/z$²¼­Šh@òq>J´d—Í|>rF-)€àÿ®’šãE°wVƒ>(å`ÄRîÍ™=?¬È¯ùé¬Š¶VâÌ ÿlj•%[”u÷¦ãÕı9ø£jm Zê¿èoÚŸ’Ae¦x¼¯c§)F=/îÑ	_îe?øFP®ÜU-Áàª9š¨¾µÇMnnô"‘B9äòõŒs“®c`VÖßKw;.tôlh…µzÆœjÌÖ#60fsN{Ú† €.ÀµôXYÑfÈ¦xxÔ¼hj„êéÉ%zÌá7!×´ƒÊİk
¸Ëø NˆŞÃF}!ÍF3Vzj°ÀxIT„¾±ÌØ%z€µKHuW»×„˜î¥Ú¯ãHÎ›“DÙ~½çş1ó«'µjåZ|ÂºA ›WY©”qçÉM[ZÎWşÁ¯ÚCG£±¤¾i¶«-n,/¼q‚:/c_tñ÷ÅZø1u¯0Åé?ùºQÉÇjš‰‹;˜æ¬¦ÅJxñbŒ_·ä˜ –åÜöDszÂXjTÍĞ–ÍF …géÀ³lwÛñ2Àrÿî_y.¼r&jn¿px‰[„œÛyÈ¯ZãK›õË×¸K˜ÛİÛ7³FîÉ.™K«‹Ü4Åüt‰Å• Ù—ög¬ò,‹Òú¬ô$#§ìûëM9ìü7ãP%´Ü‚
¾öš-3 ZKqUëp5îØ‹Î%¡ë<³ñ€Álò‘š®»l.Âğü®Á[Ò»yXsZ=×ÃŠúpÒÒ^Õ¯Ùñnøø©¦e·Äz;J·ò?tÚâçí—õî!W³€4*ÇpZ‚.¤³¨JéKÀLÑã_!I,a™ş'Â1aâVæbÍø„~£äJ¦‹ø`!\Gj©­Ìm")“õp¡c`0°ä¥8	hşRaRÑE¥šb\b7ÁB[Í!…fŞ˜ª>‘’£¬ÂqÛ¿È¢íµpL"/”‚Í=!g÷¼m04•¥öñÛ§•åEKì‚Â«àk½$Qe´İH9àÊ©Š=¡œ¸ñ<ô'?+vïo¾ y‹Ö\µç,q¢tyÂÀ{UšyŞ‘ºUà5íüZ£ĞêÔwh6F››9ùKµBårû«ÈVƒõ(=Åp‡H{œ­çô3WşûÿVË@—¬¢¹ŸÁ·£„@cJlñT$‹&