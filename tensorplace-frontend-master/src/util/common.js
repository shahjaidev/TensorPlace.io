import { format } from 'date-fns';

export function $mountTabs() {
  const allTabs = document.querySelectorAll('.detail-tabs-wraper .tabs li');
  for(let i = 0; i < allTabs.length; i++) {
    allTabs[i].addEventListener("click", () => {
      let tabId = allTabs[i].dataset.tab;
      $removeClass(allTabs);
      allTabs[i].classList.add('current');
      document.getElementById(tabId).classList.add('current');
    })
  }
}

export function $removeClass(allTabs) {
  for(let i = 0; i < allTabs.length; i++) {
    allTabs[i].classList.remove('current');
    document.getElementsByClassName('tab-content')[i].classList.remove('current');
  }
}

export function arrayOfSlug(arr) {
  const newArr = [];
  arr.map((item) => {
    newArr.push(item.slug);
  })

  return newArr;
}

export function formatPrice(price) {
  if (price == null) {
    return '';
  }

  const symbol = '$';
  // const amount = Math.abs(price).toFixed(2);
  const amount = price;
  const sign = price < 0 ? '-' : '';
  return `${sign}${symbol}${amount}`;
}

export function formateNumber(digit) {
  const number = ("00" + digit).slice(-3);
  return number;
}

export function formateDate(dateString) {
  return format(new Date(dateString), 'MM/dd/yyyy');
};

export function countTotalRating(reviews) {
  let allRating = [];

  for(let i=0; i < reviews.length;i++) {
    allRating.push(reviews[i].docRating);
    allRating.push(reviews[i].codeRating)
    allRating.push(reviews[i].devRating)
  }
  if(allRating.length > 0) {
    const allRates = allRating.reduce((total, num) => total + num, 0);
    return allRates/allRating.length;
  }

  return 0;
}

export function objectHasKey(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}


/**
 * takes an object and converts to query params for URLS. works recursively
 * @param obj
 * @param prefix
 * @returns {string}
 */
export const serialize = (obj, prefix) => {
  const str = [];
  const keys = Object.keys(obj);

  keys.forEach((p) => {
    if (objectHasKey(obj, p)) {
      const k = prefix ? `${prefix}[${p}]` : p;
      const v = obj[p];
      str.push((v !== null && typeof v === 'object') ?
        serialize(v, k) :
        `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
    }
  });
  return str.join('&');
};

export function priceRangeDropdown() {
  const wrapper = document.getElementsByClassName('price-range');
  if(wrapper) {
    wrapper[0].addEventListener('click', () => {
      document.getElementsByClassName('input-range')[0].classList.toggle('d-block');
    })
  }
}
