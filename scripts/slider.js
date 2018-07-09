/**
 * Represents a responsive slider which can be used as ribbon.
 *
 * @module Slider
 * @version v1.1.0
 *
 * @author Sebastian Fitzner
 * @author Andy Gutsche
 */
import $ from '@veams/query';
import Component from '@veams/component';
import transitionEndEvent from '@veams/helpers/lib/detection/transition-end-event';
import getComputedTranslate from '@veams/helpers/lib/browser/get-computed-translate';

class Slider extends Component {
	/**
	 * General Properties
	 */

	// Elements in Markup
	$el = $(this.el);
	$prev = this.$el.find(this.options.selectors.prev);
	$next = this.$el.find(this.options.selectors.next);
	$items = this.$el.find(this.options.selectors.items);
	$initialItems = this.$items;
	$wrapper = this.$el.find(this.options.selectors.wrapper);
	$ribbon = this.$el.find(this.options.selectors.ribbon);
	$lastItem = this.$items.eq(this.$items.length - 1);
	$firstItem = this.$items.eq(0);

	// Transition
	transition = this.$ribbon.css('transition');

	// Pagination
	paginationDisabled = this.options.disablePagination || this.$items.length < 2;
	paginationItemSel = '[data-js-item="' + this.options.paginationItemJsItem + '"]';
	infinite = this.options.infinite && this.$items.length > 1;
	touchSwipeEnabled = false;
	clickHandler = true;
	_index = this.options.startAtIndex || 0;
	_autoPlay = this.options.autoPlay && this.infinite;

	/**
	 * Constructor for our class
	 *
	 * @see module.js
	 *
	 * @param {Object} obj - Object which is passed to our class
	 * @param {Object} obj.el - element which will be saved in this.el
	 * @param {Object} obj.options - options which will be passed in as JSON object
	 */
	constructor(obj) {
		let options = {
			classes: {
				active: 'is-active', // Active class for slides and pagination items
				cloned: 'is-cloned', // Clone class for cloned items (only used with infinite)
				disabled: 'is-disabled', // Disabled class for next/prev button
				hidden: 'is-hidden', // hidden class for pagination
				paginationItem: 'slider__pagination-list-item', // Define your class which we use in our mini tmpl
				sliding: 'is-sliding', // Class to be set during slide animation
				unresolved: 'is-unresolved' // Unresolved class which gets removed when initialized
			},
			autoPlay: false, // Enable AutoPlay
			autoPlayInterval: 3000, // AutoPlay interval in milliseconds
			disablePagination: false, // Disable pagination display
			enableTouchSwipe: true, // Enable/Disable swipe support
			groupPaginationItems: false, // Group the pagination elements (useful for multiple visible items)
			infinite: false, // Infinite looping (only possible without multiple visible items)
			pageScrollThreshold: 30, // Threshold for vertical swipe in pixels
			paginationItemJsItem: 'slider-pagination-item', // data-js-item for pagination list item
			pauseOnHover: true, // Used when options.autoPlay is true
			selectors: {
				items: '[data-js-item="slider-item"]', // Slide Items
				next: '[data-js-item="slider-next"]', // Next Button
				prev: '[data-js-item="slider-prev"]', // Previous Button
				paginationList: '[data-js-item="slider-pagination-list"]', // Pagination List
				ribbon: '[data-js-item="slider-ribbon"]', // Ribbon element
				wrapper: '[data-js-item="slider-wrapper"]' // Wrapper element
			},
			slideByItemNumber: false, // Use the option to override the initial slide step
			startAtIndex: 0, // Start at a different index
			swipeThreshold: 5, // Threshold for horizontal swipe in percent
			visibleItems: {
				// Visible items per viewport
				'mobile-s': 1,
				'mobile-p': 1,
				'mobile-l': 1,
				'mobile-xl': 1,
				'tablet-p': 1,
				'tablet-l': 1,
				'desktop-m': 1,
				'desktop-l': 1,
				'desktop-xl': 1
			}
		};

		super(obj, options);
	}

	/**
	 * Custom getters and setter
	 */

	/**
	 * Get module information
	 */
	static get info() {
		return {
			version: '1.0.0',
			vc: true,
			mod: false
		};
	}

	/**
	 * Get and set visible items.
	 *
	 * @param {number} visible - Number of visible items
	 */
	get visibles() {
		return this._numVisible;
	}

	set visibles(visible) {
		this._numVisible = visible;
	}

	/**
	 * Get and set items length for slider.
	 *
	 * @param {number} len - Number of item length
	 */
	get itemsLength() {
		return this._itemLength;
	}

	set itemsLength(len) {
		this._itemLength = len;
	}

	/**
	 * Get and set the index of slider.
	 *
	 * @param {number} idx - index number of slide
	 */
	get index() {
		return this._index;
	}

	set index(idx) {
		this._index = idx;
	}

	/**
	 * Get paused property.
	 *
	 * @param {Boolean} bool - pause state
	 */
	get paused() {
		return this._paused;
	}

	set paused(bool) {
		this._paused = bool;
	}

	/**
	 * Get autoPlay property.
	 *
	 * @param {Boolean} bool - autoplay state
	 */
	get autoPlay() {
		return this._autoPlay;
	}

	set autoPlay(bool) {
		this._autoPlay = bool;
	}

	/**
	 * Get controls height.
	 */
	get controlHeight() {
		return this.$prev.outerHeight();
	}

	/**
	 * Return the defined option or current visible items
	 * which will be used for the next and previous slide animation.
	 */
	get slideBy() {
		return this.options.slideByItemNumber || this.visibles;
	}

	/**
	 * Get ribbon width.
	 */
	get ribbonWidth() {
		return this.$items.length * this.thumbWidth;
	}

	/** =================================================
	 * EVENTS
	 * ================================================ */

	/**
	 * Bind local events to this.$el.
	 */
	get events() {
		return {
			'click {{this.options.selectors.prev}}': 'showPrevElement',
			'touchstart {{this.options.selectors.prev}}': 'showPrevElement',
			'click {{this.options.selectors.next}}': 'showNextElement',
			'touchstart {{this.options.selectors.next}}': 'showNextElement',
			'click {{this.paginationItemSel}}': 'navigateToElement',
			'touchstart {{this.paginationItemSel}}': 'navigateToElement'
		};
	}

	/**
	 * Subscribe to global events of Veams or App namespace.
	 */
	get subscribe() {
		return {
			'{{context.EVENTS.resize}}': 'render'
		};
	}

	/**
	 * Bind all events
	 */
	bindEvents() {
		if (this.autoPlay && this.options.pauseOnHover) {
			this.registerEvent('{{context.EVENTS.mouseenter}}', 'pause');
			this.registerEvent('{{context.EVENTS.mouseleave}}', 'play');
		}
	}

	/**
	 * Unbind all events
	 */
	unbindEvents() {
		// Global Events
		this.context.Vent.off(this.context.EVENTS.resize);

		// Local Events
		this.$el.off(this.context.clickHandler);
	}

	/** =================================================
	 * STANDARD METHODS
	 * ================================================= */
	didMount() {
		if (!this.paginationDisabled) {
			this.$paginationList = this.$el.find(this.options.selectors.paginationList);
		}

		if (this.options.autoPlay && !this.infinite) {
			console.warn(
				'Slider: Sorry - option "autoPlay" has no effect while option "infinite" is set to false!'
			);
		}

		if (this.infinite) {

			for (let item in this.options.visibleItems) {
				if (this.options.visibleItems.hasOwnProperty(item)) {
					if (this.options.visibleItems[item] > 1) {
						console.warn(
							'Slider: Sorry - option "visibleItems" has no effect while option "infinite" is set to true!'
						);
						break;
					}
				}
			}
		}
	}

	/**
	 * Renders the view's template to the UI
	 */
	render() {
		if (!this.context.currentMedia) {
			console.warn(
				'Slider: this.context.currentMedia is necessary to support the slider module!'
			);
			return;
		}

		if (this.$clonedLast && this.$clonedFirst) {
			this.$clonedLast.remove();
			this.$clonedFirst.remove();
			this.$items = this.$initialItems;
		}

		this.visibles = this.infinite ? 1 : this.options.visibleItems[this.context.currentMedia];
		this.itemsLength = this.$items.length;

		this.handleVisibility();

		if (!this.paginationDisabled) {
			this.removePagination();
			this.addPagination();
		}

		if (this.infinite) {
			this.infiniteLoop();
			this.index = this.index === 0 ? this.index + this.visibles : this.index;
		}

		this.bindTransitions();
		this.getAndSetDimensions();

		if (
			this.context.detections.touch &&
			this.options.enableTouchSwipe &&
			!this.touchSwipeEnabled
		) {
			this.bindSwipes();
		}

		this.goToItem(this.index);

		if (this.autoPlay && this.paused) {
			this.play();
		}
	}

	/** =================================================
	 * CUSTOM SLIDER METHODS
	 * ================================================= */

	/**
	 * Bind transition events
	 *
	 */
	bindTransitions() {
		let onRibbonTransitionEnd = this.onRibbonTransitionEnd.bind(this);
		let onItemsTransitionEnd = this.onItemsTransitionEnd.bind(this);

		this.$ribbon.on(transitionEndEvent(), onRibbonTransitionEnd);
		this.$items.on(transitionEndEvent(), onItemsTransitionEnd);
	}

	/**
	 * React to transitionend on ribbon
	 *
	 * @param {Object} e - Event object.
	 */
	onRibbonTransitionEnd(e) {
		e.stopPropagation();

		this.$el.removeClass(this.options.classes.sliding);

		if (this.autoPlay && this.paused) {

			if (this.options.pauseOnHover) {

				if (!this.$el.is(':hover')) {
					this.play();
				}
			} else {
				this.play();
			}
		}

		if (this.$clonedFirst && this.$clonedFirst.hasClass(this.options.classes.active)) {
			this.$clonedFirst.removeClass(this.options.classes.active);
			this.index = 1;

			this.animateSlide({
				idx: this.index,
				animate: false
			});
		}

		if (this.$clonedLast && this.$clonedLast.hasClass(this.options.classes.active)) {
			this.$clonedLast.removeClass(this.options.classes.active);
			this.index = this.$items.length - this.visibles - 1;

			this.animateSlide({
				idx: this.index,
				animate: false
			});
		}

		this.clickHandler = true;
	}

	/**
	 * React to transitionend on items
	 *
	 * @param {Object} e - Event object.
	 */
	onItemsTransitionEnd(e) {
		e.stopPropagation();
	}

	/**
	 * Clone first and last element
	 *
	 */
	infiniteLoop() {
		this.$clonedFirst = this.$firstItem.clone(true).addClass(this.options.classes.cloned);
		this.$clonedLast = this.$lastItem.clone(true).addClass(this.options.classes.cloned);

		if (this.options.infinite) {
			this.$clonedFirst.find(this.paginationItemSel).attr('data-index', this.itemsLength);
			this.$clonedLast.find(this.paginationItemSel).attr('data-index', -1);
		}

		this.$firstItem.before(this.$clonedLast);
		this.$lastItem.after(this.$clonedFirst);

		this.$items = $(this.options.selectors.items, this.$el);
	}

	/**
	 * Animate slide
	 *
	 * @param {Object} obj - animation property object.
	 */
	animateSlide(obj) {
		if (!obj.animate) {
			this.$ribbon.css('transition', 'none');
		} else {
			if (obj.idx !== obj.prevIdx) {
				this.$el.addClass(this.options.classes.sliding);
			}

			this.$ribbon.css('transition', this.transition);
		}

		this.$ribbon.css('transform', 'translate3d(' + -obj.idx * this.thumbWidth + 'px, 0, 0)');
	}

	/**
	 * Check first/last slide classes
	 *
	 */
	checkSlides() {
		if (this.$clonedFirst.hasClass(this.options.classes.active)) {
			this.$firstItem.addClass(this.options.classes.active);
		}
		if (this.$clonedLast.hasClass(this.options.classes.active)) {
			this.$lastItem.addClass(this.options.classes.active);
		}
	}

	/**
	 * When items length is 0 we hide this view.
	 */
	handleVisibility() {
		if (this.itemsLength === 0) {
			this.$el.addClass(this.options.classes.hidden);
			console.warn('Slider: There is no item we can use in our slider :(');
		}

		this.$el.css('max-width', 'none');
	}

	/**
	 * Empty pagination.
	 */
	removePagination() {
		this.$paginationList.empty();
	}

	/**
	 * Add pagination elements with a simple string template and
	 * save a pagination item reference.
	 */
	addPagination() {
		let tmpl = '';
		let i = 0;
		let item = this.options.paginationItemJsItem;
		let itemClass = this.options.classes.paginationItem;

		for (i; i < this.$items.length; i++) {
			let idx = i + 1;
			let hiddenClass = '';

			if (this.options.groupPaginationItems) {
				hiddenClass = i % this.visibles === 0 ? '' : this.options.classes.hidden;
			}

			tmpl += `
					<li class="${itemClass} ${hiddenClass}" data-js-item="${item}" data-index="${i}">
						<strong>${idx}</strong>
					</li>
					`;
		}

		this.$paginationList.append(tmpl);
		this.$paginationItems = $(
			'[data-js-item="' + this.options.paginationItemJsItem + '"]',
			this.$el
		);
	}

	/**
	 * Navigate to a specific slide.
	 *
	 * @param {object} e - Event object.
	 * @param {object} currentTarget - Target to which listener was attached.
	 */
	navigateToElement(e, currentTarget) {
		let $currentTarget = $(currentTarget);

		if ($currentTarget.hasClass(this.options.classes.active)) {
			return;
		}

		let idx = parseInt($currentTarget.attr('data-index'), 10) || $currentTarget.index();

		if (this.infinite) {
			idx = idx + this.slideBy;
		}

		this.goToItem(idx);
	}

	/**
	 * Go to the next slide.
	 *
	 * @param {object} e - Event object.
	 * @param {object} currentTarget - Target to which listener was attached.
	 */
	showNextElement(e, currentTarget) {
		const $currentTarget = $(currentTarget);

		if (e && typeof e.preventDefault === 'function') {
			e.preventDefault();
		}

		if ($currentTarget.prop('disabled')) {
			return;
		}

		if (this.clickHandler) {
			this.goToItem(this.index + this.slideBy);
			this.clickHandler = false;
		}
	}

	/**
	 * Go to the previous slide.
	 *
	 * @param {object} e - Event object.
	 * @param {object} currentTarget - Target to which listener was attached.
	 */
	showPrevElement(e, currentTarget) {
		const $currentTarget = $(currentTarget);

		if (e && typeof e.preventDefault === 'function') {
			e.preventDefault();
		}

		if ($currentTarget.prop('disabled')) {
			return;
		}

		if (this.clickHandler) {
			this.goToItem(this.index - this.slideBy);
			this.clickHandler = false;
		}
	}

	/**
	 * Return the direction `next` or `prev`.
	 *
	 * @param {number} index - Index of the pagination element.
	 */
	getDirection(index) {
		return index > this.index ? 'next' : 'prev';
	}

	/**
	 * Bind all swipe gestures.
	 */
	bindSwipes() {
		this.registerEvent(
			'{{context.EVENTS.touchstart}} {{this.options.selectors.ribbon}}',
			'startDrag'
		);
	}

	/**
	 * Drag handler for preview controller and map
	 *
	 * @param {Object} e - Event object for 'touchstart' events
	 * @param {Object} e - Event object for 'touchstart' events
	 */
	startDrag(e, currentTarget) {
		let elem = currentTarget;
		let $elem = $(elem);
		let deltaX = 0;
		let deltaY = 0;

		// save initial values (including current x and y offset values)
		let dragStartValues = {
			elemX: elem.offsetLeft + getComputedTranslate(elem, 'x'),
			pageX: e.touches[0].pageX,
			pageY: e.touches[0].pageY
		};

		// on 'touchmove'
		$elem.on(this.context.EVENTS.touchmove, e => {
			// get delta compared to initial values
			let dragValues = Slider.getDragValues(e, dragStartValues);

			deltaX = dragValues.deltaX;
			deltaY = dragValues.deltaY;

			if (Math.abs(deltaY) <= this.options.pageScrollThreshold) {
				this.translateRibbon(dragValues.x);
			}
		});

		// if user stops touching stop tracking of touch movement
		$(window).on(this.context.EVENTS.touchend, () => {
			$(window).off(this.context.EVENTS.touchend);
			$elem.off(this.context.EVENTS.touchmove);

			// if drag delta for x < threshold snap back
			if (
				Math.abs(deltaX) <= this.$el.outerWidth() * (this.options.swipeThreshold / 100) ||
				Math.abs(deltaY) > this.options.pageScrollThreshold
			) {
				this.goToItem(this.index);

				return;
			}

			e.preventDefault();

			// swipe right
			if (deltaX > 0) {
				// if not first item goto previous otherwise snap back
				if (this.index > 0) {
					this.goToItem(this.index - 1);
				} else {
					this.goToItem(this.index);
				}
			}

			// swipe left
			if (deltaX < 0) {
				// if not last item goto next otherwise snap back
				if (this.index < this.$items.length - 1) {
					this.goToItem(this.index + 1);
				} else {
				}
				this.goToItem(this.index);
			}
		});
	}

	/**
	 * Calculate and return delta values between initial values and current values
	 *
	 * @param {Object} e - Event object for 'touchstart' events
	 * @param {Object} dragStartValues - Object containing initial values
	 *
	 * @return {Object} - Delta values and new x-value
	 */
	static getDragValues(e, dragStartValues) {
		let deltaX = e.touches[0].pageX - dragStartValues.pageX;
		let deltaY = e.touches[0].pageY - dragStartValues.pageY;

		return {
			x: dragStartValues.elemX + deltaX,
			deltaX: deltaX,
			deltaY: deltaY
		};
	}

	/**
	 * Translate ribbon on swipe
	 *
	 * @param {Number} x - New translate value for x-axis
	 */
	translateRibbon(x) {
		this.$ribbon.css({
			transform: 'translate3d(' + x + 'px, 0, 0)',
			transition: 'none'
		});
	}

	/**
	 * Enables button
	 *
	 * @param {Object} $btn - button element.
	 */
	enableBtn($btn) {
		$btn.removeClass(this.options.classes.disabled);
		$btn.prop('disabled', false);
		$btn.removeAttr('aria-disabled');
	}

	/**
	 * Disables button
	 *
	 * @param {Object} $btn - button element.
	 */
	disableBtn($btn) {
		$btn.addClass(this.options.classes.disabled);
		$btn.prop('disabled', true);
		$btn.attr('aria-disabled', true);
	}

	/**
	 * Handles the method to go to a specific item.
	 * Further we handle the class
	 *
	 * @param {number} i - Index number.
	 */
	goToItem(i) {
		let maxIndex = this.$items.length - this.visibles;

		if (maxIndex < 0) {
			maxIndex = 0;
		}

		if (!this.paused) {
			this.pause();
		}

		if (this.infinite) {
			if (i < 0) {
				i = maxIndex;
			} else if (i > maxIndex) {
				i = 0;
			}
		} else {
			this.enableBtn(this.$prev);
			this.enableBtn(this.$next);

			if (i < 1) {
				this.disableBtn(this.$prev);

				if (i < 0) {
					i = 0;
				}
			}

			if (i > maxIndex - 1) {
				this.disableBtn(this.$next);

				if (i > maxIndex) {
					i = maxIndex;
				}
			}
		}

		let prevIdx = this.index;
		this.index = i;

		this.animateSlide({
			animate: !this.$el.hasClass(this.options.classes.unresolved),
			idx: i,
			prevIdx: prevIdx
		});

		if (this.$el.hasClass(this.options.classes.unresolved)) {
			this.$el.removeClass(this.options.classes.unresolved);
		}

		this.handleActivity();

		if (this.infinite) {
			this.checkSlides();
		}
	}

	/**
	 * Handle activity.
	 */
	handleActivity() {
		this.$items.removeClass(this.options.classes.active);

		if (!this.paginationDisabled && this.$paginationItems && this.$paginationItems.length) {
			this.$paginationItems.removeClass(this.options.classes.active);
		}

		// If this slider instance isn't infinite
		if (!this.infinite) {
			for (let idx = this.index; idx < this.index + this.visibles; idx++) {
				// First set active slide element(s)
				this.$items.eq(idx).addClass(this.options.classes.active);

				// Do that also for pagination element(s)
				if (!this.paginationDisabled) {
					this.$paginationItems.eq(idx).addClass(this.options.classes.active);
				}
			}
		} else {
			for (let idx = this.index - 1; idx < this.index - 1 + this.visibles; idx++) {
				let slideIdx = idx;
				this.$items.eq(slideIdx + 1).addClass(this.options.classes.active);

				if (!this.paginationDisabled) {
					if (idx >= this.$paginationItems.length) {
						slideIdx = 0;
					}

					if (idx < 0) {
						slideIdx = this.$paginationItems.length - 1;
					}

					this.$paginationItems.eq(slideIdx).addClass(this.options.classes.active);
				}
			}
		}
	}

	/**
	 * Start autoplay.
	 */
	play() {
		clearInterval(this.autoPlayInterval);

		this.autoPlayInterval = setInterval(() => {
			this.goToItem(this.index + this.visibles);
		}, this.options.autoPlayInterval);

		this.paused = false;
	}

	/**
	 * Pause autoplay.
	 */
	pause() {
		clearInterval(this.autoPlayInterval);
		this.paused = true;
	}

	/**
	 * Get and set dimensions for our project progress.
	 */
	getAndSetDimensions() {
		this.resetStyles();
		this.width = this.$wrapper.outerWidth();
		this.thumbWidth = this.width / this.visibles;
		this.$wrapper.css('width', this.width + 'px');
		this.$items.css('width', this.thumbWidth + 'px');

		this.$ribbon.css({
			width: this.ribbonWidth + 'px'
		});
	}

	/**
	 * Reset width styles
	 */
	resetStyles() {
		this.$wrapper[0].removeAttribute('style');
		this.$items.removeAttr('style');
		this.$ribbon.removeAttr('style');
	}
}

export default Slider;
