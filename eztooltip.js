/*jslint plusplus: true */
var ezTooltip = (function () {
    "use strict";
    // variables for tooltip 
    var toolTipCount, displayTip;

    function createToolTipDiv(callback) {
        var ttDiv, ttInner, ttArrow;
        // create container div for tooltip
        ttDiv = document.createElement('div');
        ttDiv.setAttribute('id', 'ez-tt-display');
        ttDiv.style.position = 'absolute';
        ttDiv.style.opacity = '0';

        // create inner div for content
        ttInner = document.createElement('div');
        ttInner.setAttribute('class', 'tooltip-inner');

        // create div for arrows
        ttArrow = document.createElement('div');
        ttArrow.setAttribute('class', 'tri-bottom');

        // Attach tooltip container to body
        document.body.appendChild(ttDiv);
        displayTip = document.getElementById('ez-tt-display');

        // Attach inner and arrow div to tooltip container
        displayTip.appendChild(ttInner);
        displayTip.appendChild(ttArrow);

        // callback function after tooltip div is created
        if (callback) {
            callback();
        }
    }

    // fade in animation
    function fadeIn(el, speed) {

        // convert speed to decimal
        var cSpeed = speed * 0.001;

        // Check browser support for transition. Defaults to just opacity 1
        if (el.style.transition !== undefined) {
            el.style.transition = 'opacity ' + cSpeed + 's linear 0s';
            el.style.opacity = '1';
        } else {
            el.style.opacity = '1';
        }
    }

    function positionTip(e, tt_height, tt_width, placement) {

        // Get element target Height, Width, Left Position, Right Position, and arrow element
        var el_width = e.target.offsetWidth,
            el_height = e.target.offsetHeight,
            el_left = e.target.offsetLeft,
            el_top = e.target.offsetTop,
            ttArrow = displayTip.lastChild,
            new_left,
            new_top;

        // based on placement value calculate the tooltip position
        // default position is the placement "Bottom"
        switch (placement) {
        case 'left':
            new_left = (el_left - tt_width) - 15;
            new_top = (el_top + (el_height / 2)) - (tt_height / 2);
            ttArrow.setAttribute('class', 'tri-' + placement);
            break;
        case 'right':
            new_left = (el_left + el_width) + 15;
            new_top = (el_top + (el_height / 2)) - (tt_height / 2);
            ttArrow.setAttribute('class', 'tri-' + placement);
            break;
        case 'bottom':
            new_left = el_left - (tt_width / 2) + (el_width / 2);
            new_top = (el_top + el_height) + 15;
            ttArrow.setAttribute('class', 'tri-' + placement);
            break;
        case 'top':
            new_left = el_left - (tt_width / 2) + (el_width / 2);
            new_top = (el_top - tt_height) - 15;
            ttArrow.setAttribute('class', 'tri-' + placement);
            break;
        default:
            new_left = el_left - (tt_width / 2) + (el_width / 2);
            new_top = (el_top + el_height) + 15;
            ttArrow.setAttribute('class', 'tri-bottom');
        }

        // set the top and left postion  
        displayTip.style.top = new_top + 'px';
        displayTip.style.left = new_left + 'px';
    }

    // Remove tooltip element
    function RemoveTooltipHandler() {
        displayTip.parentElement.removeChild(displayTip);
    }

    function AddTooltipHandler(e) {
        var content, placment, ttHeight, ttWidth;
        content = this.getAttribute('data-text');
        placment = this.getAttribute('data-placement');

        // Create tooltip
        createToolTipDiv(function () {
            displayTip.firstChild.innerHTML = content; // Insert the tooltip content

            // Get height and with of tooltip div after content is inserted
            ttHeight = displayTip.offsetHeight;
            ttWidth = displayTip.offsetWidth;

            // Position the tooltip div. Also pass optional placement of tooltip.
            positionTip(e, ttHeight, ttWidth, placment);

            // Show tooltip
            fadeIn(displayTip, 200);
        });
    }

    function toolTipListener() {
        var i, originalText;

        // Loop through each tooltip element
        for (i = 0; i < toolTipCount.length; ++i) {

            // insert original title value into "data-text" attribute before removing the title attribute
            originalText = toolTipCount[i].title;
            toolTipCount[i].setAttribute('data-text', originalText);
            toolTipCount[i].removeAttribute('title');

            // mouse over listener
            toolTipCount[i].addEventListener('mouseover', AddTooltipHandler, false);
            // mouse out listener
            toolTipCount[i].addEventListener('mouseout', RemoveTooltipHandler, false);
        }
    }

    // initialize tooltip
    function init(elem) {
        toolTipCount = document.querySelectorAll(elem); // tooltip elements
        toolTipListener();
    }

    return {
        init: init
    };

}());