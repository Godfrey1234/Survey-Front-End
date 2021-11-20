/**
 * @fileoverview added by tsickle
 * Generated from: lib/slider-lightbox/slider-lightbox.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, Inject, Input, Output, EventEmitter, ViewChild, HostListener, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
/** @type {?} */
var LIGHTBOX_NEXT_ARROW_CLICK_MESSAGE = 'lightbox next';
/** @type {?} */
var LIGHTBOX_PREV_ARROW_CLICK_MESSAGE = 'lightbox previous';
var SliderLightboxComponent = /** @class */ (function () {
    function SliderLightboxComponent(cdRef, sanitizer, elRef, document) {
        this.cdRef = cdRef;
        this.sanitizer = sanitizer;
        this.elRef = elRef;
        this.document = document;
        this.totalImages = 0;
        this.nextImageIndex = -1;
        this.popupWidth = 1200;
        this.marginLeft = 0;
        this.imageFullscreenView = false;
        this.lightboxPrevDisable = false;
        this.lightboxNextDisable = false;
        this.showLoading = true;
        this.effectStyle = 'none';
        this.speed = 1; // default speed in second
        // default speed in second
        this.title = '';
        this.currentImageIndex = 0;
        // @Inputs
        this.images = [];
        this.videoAutoPlay = false;
        this.direction = 'ltr';
        this.paginationShow = false;
        this.infinite = false;
        this.arrowKeyMove = true;
        this.showVideoControls = true;
        // @Output
        this.close = new EventEmitter();
        this.prevImage = new EventEmitter();
        this.nextImage = new EventEmitter();
    }
    Object.defineProperty(SliderLightboxComponent.prototype, "imageIndex", {
        set: /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            if (index !== undefined && index > -1 && index < this.images.length) {
                this.currentImageIndex = index;
            }
            this.nextPrevDisable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderLightboxComponent.prototype, "show", {
        set: /**
         * @param {?} visiableFlag
         * @return {?}
         */
        function (visiableFlag) {
            this.imageFullscreenView = visiableFlag;
            this.elRef.nativeElement.ownerDocument.body.style.overflow = '';
            if (visiableFlag === true) {
                this.elRef.nativeElement.ownerDocument.body.style.overflow = 'hidden';
                // this.getImageData();
                this.setPopupSliderWidth();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SliderLightboxComponent.prototype, "animationSpeed", {
        set: /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            if (data
                && typeof (data) === 'number'
                && data >= 0.1
                && data <= 5) {
                this.speed = data;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    SliderLightboxComponent.prototype.onResize = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.effectStyle = 'none';
        this.setPopupSliderWidth();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SliderLightboxComponent.prototype.handleKeyboardEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event && event.key && this.arrowKeyMove) {
            if (event.key.toLowerCase() === 'arrowright') {
                this.nextImageLightbox();
            }
            if (event.key.toLowerCase() === 'arrowleft') {
                this.prevImageLightbox();
            }
            if (event.key.toLowerCase() === 'escape') {
                this.closeLightbox();
            }
        }
    };
    /**
     * @return {?}
     */
    SliderLightboxComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    SliderLightboxComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    SliderLightboxComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.resetState();
    };
    /**
     * @return {?}
     */
    SliderLightboxComponent.prototype.setPopupSliderWidth = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (window && window.innerWidth) {
            this.popupWidth = window.innerWidth;
            this.totalImages = this.images.length;
            if (typeof (this.currentImageIndex) === 'number' && this.currentImageIndex !== undefined) {
                this.marginLeft = -1 * this.popupWidth * this.currentImageIndex;
                this.getImageData();
                this.nextPrevDisable();
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.showLoading = false;
                }), 500);
            }
        }
    };
    /**
     * @return {?}
     */
    SliderLightboxComponent.prototype.closeLightbox = /**
     * @return {?}
     */
    function () {
        this.close.emit();
    };
    /**
     * @return {?}
     */
    SliderLightboxComponent.prototype.prevImageLightbox = /**
     * @return {?}
     */
    function () {
        this.effectStyle = "all " + this.speed + "s ease-in-out";
        if (this.currentImageIndex > 0 && !this.lightboxPrevDisable) {
            this.currentImageIndex--;
            this.prevImage.emit(LIGHTBOX_PREV_ARROW_CLICK_MESSAGE);
            this.marginLeft = -1 * this.popupWidth * this.currentImageIndex;
            this.getImageData();
            this.nextPrevDisable();
        }
    };
    /**
     * @return {?}
     */
    SliderLightboxComponent.prototype.nextImageLightbox = /**
     * @return {?}
     */
    function () {
        this.effectStyle = "all " + this.speed + "s ease-in-out";
        if (this.currentImageIndex < this.images.length - 1 && !this.lightboxNextDisable) {
            this.currentImageIndex++;
            this.nextImage.emit(LIGHTBOX_NEXT_ARROW_CLICK_MESSAGE);
            this.marginLeft = -1 * this.popupWidth * this.currentImageIndex;
            this.getImageData();
            this.nextPrevDisable();
        }
    };
    /**
     * @return {?}
     */
    SliderLightboxComponent.prototype.nextPrevDisable = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.lightboxNextDisable = true;
        this.lightboxPrevDisable = true;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.applyButtonDisableCondition();
        }), this.speed * 1000);
    };
    /**
     * @return {?}
     */
    SliderLightboxComponent.prototype.applyButtonDisableCondition = /**
     * @return {?}
     */
    function () {
        this.lightboxNextDisable = false;
        this.lightboxPrevDisable = false;
        if (!this.infinite && this.currentImageIndex >= this.images.length - 1) {
            this.lightboxNextDisable = true;
        }
        if (!this.infinite && this.currentImageIndex <= 0) {
            this.lightboxPrevDisable = true;
        }
    };
    /**
     * @return {?}
     */
    SliderLightboxComponent.prototype.getImageData = /**
     * @return {?}
     */
    function () {
        if (this.images
            && this.images.length
            && typeof (this.currentImageIndex) === 'number'
            && this.currentImageIndex !== undefined
            && this.images[this.currentImageIndex]
            && (this.images[this.currentImageIndex]['image'] || this.images[this.currentImageIndex]['video'])) {
            this.title = this.images[this.currentImageIndex]['title'] || '';
            this.totalImages = this.images.length;
            for (var iframeI in this.document.getElementsByTagName('iframe')) {
                if (this.document.getElementsByTagName('iframe')[iframeI]
                    && this.document.getElementsByTagName('iframe')[iframeI].contentWindow
                    && this.document.getElementsByTagName('iframe')[iframeI].contentWindow.postMessage) {
                    this.document.getElementsByTagName('iframe')[iframeI].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                }
            }
            for (var videoI in this.document.getElementsByTagName('video')) {
                if (this.document.getElementsByTagName('video')[videoI] && this.document.getElementsByTagName('video')[videoI].pause) {
                    this.document.getElementsByTagName('video')[videoI].pause();
                }
            }
        }
    };
    /**
     * @return {?}
     */
    SliderLightboxComponent.prototype.resetState = /**
     * @return {?}
     */
    function () {
        this.images = [];
    };
    /**
     * Swipe event handler
     * Reference from https://stackoverflow.com/a/44511007/2067646
     */
    /**
     * Swipe event handler
     * Reference from https://stackoverflow.com/a/44511007/2067646
     * @param {?} e
     * @param {?} when
     * @return {?}
     */
    SliderLightboxComponent.prototype.swipeLightboxImg = /**
     * Swipe event handler
     * Reference from https://stackoverflow.com/a/44511007/2067646
     * @param {?} e
     * @param {?} when
     * @return {?}
     */
    function (e, when) {
        /** @type {?} */
        var coord = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
        /** @type {?} */
        var time = new Date().getTime();
        if (when === 'start') {
            this.swipeLightboxImgCoord = coord;
            this.swipeLightboxImgTime = time;
        }
        else if (when === 'end') {
            /** @type {?} */
            var direction = [coord[0] - this.swipeLightboxImgCoord[0], coord[1] - this.swipeLightboxImgCoord[1]];
            /** @type {?} */
            var duration = time - this.swipeLightboxImgTime;
            if (duration < 1000 //
                && Math.abs(direction[0]) > 30 // Long enough
                && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
                if (direction[0] < 0) {
                    this.nextImageLightbox();
                }
                else {
                    this.prevImageLightbox();
                }
            }
        }
    };
    SliderLightboxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'slider-lightbox',
                    template: "<div *ngIf=\"imageFullscreenView\" class=\"ng-image-fullscreen-view\">\n    <div class=\"lightbox-wrapper\">\n        <a class=\"close\" (click)=\"closeLightbox()\"></a>\n        <div class=\"lightbox-div\" #lightboxDiv>\n            <div *ngIf=\"showLoading\" class=\"pre-loader\">\n                <div class=\"mnml-spinner\"></div>\n            </div>\n            <div class=\"lightbox-image-main\"\n                [ngStyle]=\"{'margin-left': marginLeft + 'px', 'grid-template-columns': 'repeat('+images.length+',1fr)', 'transition': effectStyle}\">\n                <div class=\"lightbox-image\"\n                    [ngStyle]=\"{'width': popupWidth + 'px'}\"\n                    *ngFor=\"let img of images; let i = index\"\n                    [attr.id]=\"'ng-lightbox-image-' + i\"\n                    (touchstart)=\"swipeLightboxImg($event, 'start')\"\n                    (touchend)=\"swipeLightboxImg($event, 'end')\"\n                    #lightboxImageDiv>\n                    <custom-img\n                        [imageUrl]=\"img?.image || img?.video\"\n                        [isVideo]=\"!!(img?.posterImage || img?.video)\"\n                        [currentImageIndex]=\"currentImageIndex\"\n                        [imageIndex]=\"i\"\n                        [speed]=\"speed\"\n                        [videoAutoPlay]=\"videoAutoPlay && i == currentImageIndex\"\n                        [showVideoControls]=\"showVideoControls ? 1 : 0\"\n                        [alt]=\"img?.alt || img?.title || ''\"\n                        [title]=\"img?.title || img?.alt || ''\"\n                        [showVideo]=\"true\"\n                        [direction]=\"direction\">\n                    </custom-img>\n                </div>\n            </div>\n            <div [dir]=\"direction\" [ngClass]=\"{'show': title, 'hide': !title}\" class=\"caption\">{{ title }}</div>\n            <a *ngIf=\"images.length > 1\" [ngClass]=\"{'disable': lightboxPrevDisable}\" class=\"prev icons prev-icon\" (click)=\"prevImageLightbox()\">&lsaquo;</a>\n            <a *ngIf=\"images.length > 1\" [ngClass]=\"{'disable': lightboxNextDisable}\" class=\"next icons next-icon\" (click)=\"nextImageLightbox()\">&rsaquo;</a>\n        </div>\n    </div>\n    <div *ngIf=\"paginationShow\" class=\"popup-pagination\">{{currentImageIndex + 1}} of {{totalImages}}</div>\n</div>"
                }] }
    ];
    /** @nocollapse */
    SliderLightboxComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: DomSanitizer },
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    SliderLightboxComponent.propDecorators = {
        lightboxDiv: [{ type: ViewChild, args: ['lightboxDiv', { static: false },] }],
        lightboxImageDiv: [{ type: ViewChild, args: ['lightboxImageDiv', { static: false },] }],
        images: [{ type: Input }],
        imageIndex: [{ type: Input }],
        show: [{ type: Input }],
        videoAutoPlay: [{ type: Input }],
        direction: [{ type: Input }],
        paginationShow: [{ type: Input }],
        animationSpeed: [{ type: Input }],
        infinite: [{ type: Input }],
        arrowKeyMove: [{ type: Input }],
        showVideoControls: [{ type: Input }],
        close: [{ type: Output }],
        prevImage: [{ type: Output }],
        nextImage: [{ type: Output }],
        onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }],
        handleKeyboardEvent: [{ type: HostListener, args: ['document:keyup', ['$event'],] }]
    };
    return SliderLightboxComponent;
}());
export { SliderLightboxComponent };
if (false) {
    /** @type {?} */
    SliderLightboxComponent.prototype.totalImages;
    /** @type {?} */
    SliderLightboxComponent.prototype.nextImageIndex;
    /** @type {?} */
    SliderLightboxComponent.prototype.popupWidth;
    /** @type {?} */
    SliderLightboxComponent.prototype.marginLeft;
    /** @type {?} */
    SliderLightboxComponent.prototype.imageFullscreenView;
    /** @type {?} */
    SliderLightboxComponent.prototype.lightboxPrevDisable;
    /** @type {?} */
    SliderLightboxComponent.prototype.lightboxNextDisable;
    /** @type {?} */
    SliderLightboxComponent.prototype.showLoading;
    /** @type {?} */
    SliderLightboxComponent.prototype.effectStyle;
    /** @type {?} */
    SliderLightboxComponent.prototype.speed;
    /** @type {?} */
    SliderLightboxComponent.prototype.title;
    /** @type {?} */
    SliderLightboxComponent.prototype.currentImageIndex;
    /**
     * @type {?}
     * @private
     */
    SliderLightboxComponent.prototype.swipeLightboxImgCoord;
    /**
     * @type {?}
     * @private
     */
    SliderLightboxComponent.prototype.swipeLightboxImgTime;
    /** @type {?} */
    SliderLightboxComponent.prototype.lightboxDiv;
    /** @type {?} */
    SliderLightboxComponent.prototype.lightboxImageDiv;
    /** @type {?} */
    SliderLightboxComponent.prototype.images;
    /** @type {?} */
    SliderLightboxComponent.prototype.videoAutoPlay;
    /** @type {?} */
    SliderLightboxComponent.prototype.direction;
    /** @type {?} */
    SliderLightboxComponent.prototype.paginationShow;
    /** @type {?} */
    SliderLightboxComponent.prototype.infinite;
    /** @type {?} */
    SliderLightboxComponent.prototype.arrowKeyMove;
    /** @type {?} */
    SliderLightboxComponent.prototype.showVideoControls;
    /** @type {?} */
    SliderLightboxComponent.prototype.close;
    /** @type {?} */
    SliderLightboxComponent.prototype.prevImage;
    /** @type {?} */
    SliderLightboxComponent.prototype.nextImage;
    /**
     * @type {?}
     * @private
     */
    SliderLightboxComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    SliderLightboxComponent.prototype.sanitizer;
    /**
     * @type {?}
     * @private
     */
    SliderLightboxComponent.prototype.elRef;
    /**
     * @type {?}
     * @private
     */
    SliderLightboxComponent.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyLWxpZ2h0Ym94LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWltYWdlLXNsaWRlci8iLCJzb3VyY2VzIjpbImxpYi9zbGlkZXItbGlnaHRib3gvc2xpZGVyLWxpZ2h0Ym94LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDSCxpQkFBaUIsRUFDakIsU0FBUyxFQUlULE1BQU0sRUFHTixLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDOztJQUVuRCxpQ0FBaUMsR0FBRyxlQUFlOztJQUNyRCxpQ0FBaUMsR0FBRyxtQkFBbUI7QUFFM0Q7SUF1RkksaUNBQ1ksS0FBd0IsRUFDeEIsU0FBdUIsRUFDdkIsS0FBaUIsRUFDQyxRQUFhO1FBSC9CLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3hCLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFDdkIsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUNDLGFBQVEsR0FBUixRQUFRLENBQUs7UUF0RjNDLGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBQ3hCLG1CQUFjLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDNUIsZUFBVSxHQUFXLElBQUksQ0FBQztRQUMxQixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUNyQyx3QkFBbUIsR0FBWSxLQUFLLENBQUM7UUFDckMsd0JBQW1CLEdBQVksS0FBSyxDQUFDO1FBQ3JDLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBQzVCLGdCQUFXLEdBQVcsTUFBTSxDQUFDO1FBQzdCLFVBQUssR0FBVyxDQUFDLENBQUMsQ0FBQywwQkFBMEI7O1FBQzdDLFVBQUss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SztnQ0FVTCxLQUFLOzRCQUNMLEtBQUs7aUNBQ0wsS0FBSztpQ0FDTCxLQUFLOzJCQVNMLEtBQUs7K0JBQ0wsS0FBSztvQ0FDTCxLQUFLO3dCQUdMLE1BQU07NEJBQ04sTUFBTTs0QkFDTixNQUFNOzJCQUVOLFlBQVksU0FBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUM7c0NBS3hDLFlBQVksU0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUFtSjlDLDhCQUFDO0NBQUEsQUF6TkQsSUF5TkM7U0FyTlksdUJBQXVCOzs7SUFDaEMsOENBQXdCOztJQUN4QixpREFBNEI7O0lBQzVCLDZDQUEwQjs7SUFDMUIsNkNBQXVCOztJQUN2QixzREFBcUM7O0lBQ3JDLHNEQUFxQzs7SUFDckMsc0RBQXFDOztJQUNyQyw4Q0FBNEI7O0lBQzVCLDhDQUE2Qjs7SUFDN0Isd0NBQWtCOztJQUNsQix3Q0FBbUI7O0lBQ25CLG9EQUE4Qjs7Ozs7SUFHOUIsd0RBQWlEOzs7OztJQUNqRCx1REFBc0M7O0lBRXRDLDhDQUF5RDs7SUFDekQsbURBQW1FOztJQUduRSx5Q0FBb0M7O0lBa0JwQyxnREFBd0M7O0lBQ3hDLDRDQUFtQzs7SUFDbkMsaURBQXlDOztJQVV6QywyQ0FBbUM7O0lBQ25DLCtDQUFzQzs7SUFDdEMsb0RBQTJDOztJQUczQyx3Q0FBMEM7O0lBQzFDLDRDQUE4Qzs7SUFDOUMsNENBQThDOzs7OztJQXlCMUMsd0NBQWdDOzs7OztJQUNoQyw0Q0FBK0I7Ozs7O0lBQy9CLHdDQUF5Qjs7Ozs7SUFDekIsMkNBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgT25Jbml0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIEluamVjdCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIE9uRGVzdHJveSxcbiAgICBJbnB1dCxcbiAgICBPdXRwdXQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIFZpZXdDaGlsZCxcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgRWxlbWVudFJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5jb25zdCBMSUdIVEJPWF9ORVhUX0FSUk9XX0NMSUNLX01FU1NBR0UgPSAnbGlnaHRib3ggbmV4dCcsXHRcbiAgICBMSUdIVEJPWF9QUkVWX0FSUk9XX0NMSUNLX01FU1NBR0UgPSAnbGlnaHRib3ggcHJldmlvdXMnXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnc2xpZGVyLWxpZ2h0Ym94JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2xpZGVyLWxpZ2h0Ym94LmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBTbGlkZXJMaWdodGJveENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgICB0b3RhbEltYWdlczogbnVtYmVyID0gMDtcbiAgICBuZXh0SW1hZ2VJbmRleDogbnVtYmVyID0gLTE7XG4gICAgcG9wdXBXaWR0aDogbnVtYmVyID0gMTIwMDtcbiAgICBtYXJnaW5MZWZ0OiBudW1iZXIgPSAwO1xuICAgIGltYWdlRnVsbHNjcmVlblZpZXc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBsaWdodGJveFByZXZEaXNhYmxlOiBib29sZWFuID0gZmFsc2U7XG4gICAgbGlnaHRib3hOZXh0RGlzYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHNob3dMb2FkaW5nOiBib29sZWFuID0gdHJ1ZTtcbiAgICBlZmZlY3RTdHlsZTogc3RyaW5nID0gJ25vbmUnO1xuICAgIHNwZWVkOiBudW1iZXIgPSAxOyAvLyBkZWZhdWx0IHNwZWVkIGluIHNlY29uZFxuICAgIHRpdGxlOiBzdHJpbmcgPSAnJztcbiAgICBjdXJyZW50SW1hZ2VJbmRleDogbnVtYmVyID0gMDtcblxuICAgIC8vIGZvciBzd2lwZSBldmVudFxuICAgIHByaXZhdGUgc3dpcGVMaWdodGJveEltZ0Nvb3JkPzogW251bWJlciwgbnVtYmVyXTtcbiAgICBwcml2YXRlIHN3aXBlTGlnaHRib3hJbWdUaW1lPzogbnVtYmVyO1xuXG4gICAgQFZpZXdDaGlsZCgnbGlnaHRib3hEaXYnLCB7IHN0YXRpYzogZmFsc2UgfSkgbGlnaHRib3hEaXY7XG4gICAgQFZpZXdDaGlsZCgnbGlnaHRib3hJbWFnZURpdicsIHsgc3RhdGljOiBmYWxzZSB9KSBsaWdodGJveEltYWdlRGl2O1xuXG4gICAgLy8gQElucHV0c1xuICAgIEBJbnB1dCgpIGltYWdlczogQXJyYXk8b2JqZWN0PiA9IFtdO1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IGltYWdlSW5kZXgoaW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAoaW5kZXggIT09IHVuZGVmaW5lZCAmJiBpbmRleCA+IC0xICYmIGluZGV4IDwgdGhpcy5pbWFnZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRJbWFnZUluZGV4ID0gaW5kZXg7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5uZXh0UHJldkRpc2FibGUoKTtcbiAgICB9XG4gICAgQElucHV0KClcbiAgICBzZXQgc2hvdyh2aXNpYWJsZUZsYWc6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5pbWFnZUZ1bGxzY3JlZW5WaWV3ID0gdmlzaWFibGVGbGFnO1xuICAgICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQub3duZXJEb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgIGlmICh2aXNpYWJsZUZsYWcgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICAgICAgICAgIC8vIHRoaXMuZ2V0SW1hZ2VEYXRhKCk7XG4gICAgICAgICAgICB0aGlzLnNldFBvcHVwU2xpZGVyV2lkdGgoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBASW5wdXQoKSB2aWRlb0F1dG9QbGF5OiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgZGlyZWN0aW9uOiBzdHJpbmcgPSAnbHRyJztcbiAgICBASW5wdXQoKSBwYWdpbmF0aW9uU2hvdzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IGFuaW1hdGlvblNwZWVkKGRhdGE6IG51bWJlcikge1xuICAgICAgICBpZiAoZGF0YVxuICAgICAgICAgICAgJiYgdHlwZW9mIChkYXRhKSA9PT0gJ251bWJlcidcbiAgICAgICAgICAgICYmIGRhdGEgPj0gMC4xXG4gICAgICAgICAgICAmJiBkYXRhIDw9IDUpIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWQgPSBkYXRhO1xuICAgICAgICB9XG4gICAgfVxuICAgIEBJbnB1dCgpIGluZmluaXRlOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgYXJyb3dLZXlNb3ZlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBzaG93VmlkZW9Db250cm9sczogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvLyBAT3V0cHV0XG4gICAgQE91dHB1dCgpIGNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgQE91dHB1dCgpIHByZXZJbWFnZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIEBPdXRwdXQoKSBuZXh0SW1hZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxuICAgIG9uUmVzaXplKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZWZmZWN0U3R5bGUgPSAnbm9uZSc7XG4gICAgICAgIHRoaXMuc2V0UG9wdXBTbGlkZXJXaWR0aCgpO1xuICAgIH1cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXl1cCcsIFsnJGV2ZW50J10pXG4gICAgaGFuZGxlS2V5Ym9hcmRFdmVudChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQua2V5ICYmIHRoaXMuYXJyb3dLZXlNb3ZlKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5LnRvTG93ZXJDYXNlKCkgPT09ICdhcnJvd3JpZ2h0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dEltYWdlTGlnaHRib3goKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleS50b0xvd2VyQ2FzZSgpID09PSAnYXJyb3dsZWZ0Jykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJldkltYWdlTGlnaHRib3goKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGV2ZW50LmtleS50b0xvd2VyQ2FzZSgpID09PSAnZXNjYXBlJykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VMaWdodGJveCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICAgICAgICBwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnkpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnJlc2V0U3RhdGUoKTtcbiAgICB9XG5cbiAgICBzZXRQb3B1cFNsaWRlcldpZHRoKCkge1xuICAgICAgICBpZiAod2luZG93ICYmIHdpbmRvdy5pbm5lcldpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLnBvcHVwV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgICAgIHRoaXMudG90YWxJbWFnZXMgPSB0aGlzLmltYWdlcy5sZW5ndGg7XG4gICAgICAgICAgICBpZiAodHlwZW9mICh0aGlzLmN1cnJlbnRJbWFnZUluZGV4KSA9PT0gJ251bWJlcicgJiYgdGhpcy5jdXJyZW50SW1hZ2VJbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXJnaW5MZWZ0ID0gLTEgKiB0aGlzLnBvcHVwV2lkdGggKiB0aGlzLmN1cnJlbnRJbWFnZUluZGV4O1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0SW1hZ2VEYXRhKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0UHJldkRpc2FibGUoKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbG9zZUxpZ2h0Ym94KCkge1xuICAgICAgICB0aGlzLmNsb3NlLmVtaXQoKTtcbiAgICB9XG5cbiAgICBwcmV2SW1hZ2VMaWdodGJveCgpIHtcbiAgICAgICAgdGhpcy5lZmZlY3RTdHlsZSA9IGBhbGwgJHt0aGlzLnNwZWVkfXMgZWFzZS1pbi1vdXRgO1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50SW1hZ2VJbmRleCA+IDAgJiYgIXRoaXMubGlnaHRib3hQcmV2RGlzYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50SW1hZ2VJbmRleC0tO1xuICAgICAgICAgICAgdGhpcy5wcmV2SW1hZ2UuZW1pdChMSUdIVEJPWF9QUkVWX0FSUk9XX0NMSUNLX01FU1NBR0UpO1xuICAgICAgICAgICAgdGhpcy5tYXJnaW5MZWZ0ID0gLTEgKiB0aGlzLnBvcHVwV2lkdGggKiB0aGlzLmN1cnJlbnRJbWFnZUluZGV4O1xuICAgICAgICAgICAgdGhpcy5nZXRJbWFnZURhdGEoKTtcbiAgICAgICAgICAgIHRoaXMubmV4dFByZXZEaXNhYmxlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZXh0SW1hZ2VMaWdodGJveCgpIHtcbiAgICAgICAgdGhpcy5lZmZlY3RTdHlsZSA9IGBhbGwgJHt0aGlzLnNwZWVkfXMgZWFzZS1pbi1vdXRgO1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50SW1hZ2VJbmRleCA8IHRoaXMuaW1hZ2VzLmxlbmd0aCAtIDEgJiYgIXRoaXMubGlnaHRib3hOZXh0RGlzYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50SW1hZ2VJbmRleCsrO1xuICAgICAgICAgICAgdGhpcy5uZXh0SW1hZ2UuZW1pdChMSUdIVEJPWF9ORVhUX0FSUk9XX0NMSUNLX01FU1NBR0UpO1xuICAgICAgICAgICAgdGhpcy5tYXJnaW5MZWZ0ID0gLTEgKiB0aGlzLnBvcHVwV2lkdGggKiB0aGlzLmN1cnJlbnRJbWFnZUluZGV4O1xuICAgICAgICAgICAgdGhpcy5nZXRJbWFnZURhdGEoKTtcbiAgICAgICAgICAgIHRoaXMubmV4dFByZXZEaXNhYmxlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZXh0UHJldkRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMubGlnaHRib3hOZXh0RGlzYWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMubGlnaHRib3hQcmV2RGlzYWJsZSA9IHRydWU7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hcHBseUJ1dHRvbkRpc2FibGVDb25kaXRpb24oKTtcbiAgICAgICAgfSwgdGhpcy5zcGVlZCAqIDEwMDApO1xuICAgIH1cblxuICAgIGFwcGx5QnV0dG9uRGlzYWJsZUNvbmRpdGlvbigpIHtcbiAgICAgICAgdGhpcy5saWdodGJveE5leHREaXNhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubGlnaHRib3hQcmV2RGlzYWJsZSA9IGZhbHNlO1xuICAgICAgICBpZiAoIXRoaXMuaW5maW5pdGUgJiYgdGhpcy5jdXJyZW50SW1hZ2VJbmRleCA+PSB0aGlzLmltYWdlcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICB0aGlzLmxpZ2h0Ym94TmV4dERpc2FibGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5pbmZpbml0ZSAmJiB0aGlzLmN1cnJlbnRJbWFnZUluZGV4IDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMubGlnaHRib3hQcmV2RGlzYWJsZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRJbWFnZURhdGEoKSB7XG4gICAgICAgIGlmICh0aGlzLmltYWdlc1xuICAgICAgICAgICAgJiYgdGhpcy5pbWFnZXMubGVuZ3RoXG4gICAgICAgICAgICAmJiB0eXBlb2YgKHRoaXMuY3VycmVudEltYWdlSW5kZXgpID09PSAnbnVtYmVyJ1xuICAgICAgICAgICAgJiYgdGhpcy5jdXJyZW50SW1hZ2VJbmRleCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAmJiB0aGlzLmltYWdlc1t0aGlzLmN1cnJlbnRJbWFnZUluZGV4XVxuICAgICAgICAgICAgJiYgKHRoaXMuaW1hZ2VzW3RoaXMuY3VycmVudEltYWdlSW5kZXhdWydpbWFnZSddIHx8IHRoaXMuaW1hZ2VzW3RoaXMuY3VycmVudEltYWdlSW5kZXhdWyd2aWRlbyddKSkge1xuICAgICAgICAgICAgdGhpcy50aXRsZSA9IHRoaXMuaW1hZ2VzW3RoaXMuY3VycmVudEltYWdlSW5kZXhdWyd0aXRsZSddIHx8ICcnO1xuICAgICAgICAgICAgdGhpcy50b3RhbEltYWdlcyA9IHRoaXMuaW1hZ2VzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaWZyYW1lSSBpbiB0aGlzLmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpZnJhbWUnKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpZnJhbWUnKVtpZnJhbWVJXVxuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpZnJhbWUnKVtpZnJhbWVJXS5jb250ZW50V2luZG93XG4gICAgICAgICAgICAgICAgICAgICYmIHRoaXMuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lmcmFtZScpW2lmcmFtZUldLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaWZyYW1lJylbaWZyYW1lSV0uY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZSgne1wiZXZlbnRcIjpcImNvbW1hbmRcIixcImZ1bmNcIjpcInBhdXNlVmlkZW9cIixcImFyZ3NcIjpcIlwifScsICcqJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCB2aWRlb0kgaW4gdGhpcy5kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndmlkZW8nKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd2aWRlbycpW3ZpZGVvSV0gJiYgdGhpcy5kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndmlkZW8nKVt2aWRlb0ldLnBhdXNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3ZpZGVvJylbdmlkZW9JXS5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0U3RhdGUoKSB7XG4gICAgICAgIHRoaXMuaW1hZ2VzID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3dpcGUgZXZlbnQgaGFuZGxlclxuICAgICAqIFJlZmVyZW5jZSBmcm9tIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS80NDUxMTAwNy8yMDY3NjQ2XG4gICAgICovXG4gICAgc3dpcGVMaWdodGJveEltZyhlOiBUb3VjaEV2ZW50LCB3aGVuOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY29vcmQ6IFtudW1iZXIsIG51bWJlcl0gPSBbZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCwgZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWV07XG4gICAgICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgICAgICBpZiAod2hlbiA9PT0gJ3N0YXJ0Jykge1xuICAgICAgICAgICAgdGhpcy5zd2lwZUxpZ2h0Ym94SW1nQ29vcmQgPSBjb29yZDtcbiAgICAgICAgICAgIHRoaXMuc3dpcGVMaWdodGJveEltZ1RpbWUgPSB0aW1lO1xuICAgICAgICB9IGVsc2UgaWYgKHdoZW4gPT09ICdlbmQnKSB7XG4gICAgICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBbY29vcmRbMF0gLSB0aGlzLnN3aXBlTGlnaHRib3hJbWdDb29yZFswXSwgY29vcmRbMV0gLSB0aGlzLnN3aXBlTGlnaHRib3hJbWdDb29yZFsxXV07XG4gICAgICAgICAgICBjb25zdCBkdXJhdGlvbiA9IHRpbWUgLSB0aGlzLnN3aXBlTGlnaHRib3hJbWdUaW1lO1xuXG4gICAgICAgICAgICBpZiAoZHVyYXRpb24gPCAxMDAwIC8vXG4gICAgICAgICAgICAgICAgJiYgTWF0aC5hYnMoZGlyZWN0aW9uWzBdKSA+IDMwIC8vIExvbmcgZW5vdWdoXG4gICAgICAgICAgICAgICAgJiYgTWF0aC5hYnMoZGlyZWN0aW9uWzBdKSA+IE1hdGguYWJzKGRpcmVjdGlvblsxXSAqIDMpKSB7IC8vIEhvcml6b250YWwgZW5vdWdoXG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvblswXSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0SW1hZ2VMaWdodGJveCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJldkltYWdlTGlnaHRib3goKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=