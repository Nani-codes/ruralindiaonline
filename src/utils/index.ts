export const splitBySize = (str: string, max_size = 18) => {
  const yardstick = new RegExp(`.{${max_size}}`, "g"); // /.{10}/g;
  const pieces = str.match(yardstick);
  const accumulated = (pieces as any[]).length * max_size;
  const modulo = str.length % accumulated;
  if (modulo) (pieces as any[]).push(str.slice(accumulated));

  return pieces;
};

export const components: any = {
  city: [
    'locality',
    'sublocality',
    'sublocality_level_1',
    'sublocality_level_2',
    'sublocality_level_3',
    'sublocality_level_4',
  ],
  state: [
    'administrative_area_level_1',
    'administrative_area_level_2',
    'administrative_area_level_3',
    'administrative_area_level_4',
    'administrative_area_level_5',
  ],
};

const hasNumber = /\d+/;

export const getAddressObject = (
  address_components: any,
  comp = components,
) => {
  let address: any = {
    city: '',
    state: '',
  };

  if (!address_components) {
    return null;
  }

  address_components.forEach((component: any) => {
    for (var shouldBe in comp) {
      if (comp[shouldBe].indexOf(component.types[0]) !== -1) {
        if (shouldBe === 'country') {
          address[shouldBe] = component.short_name;
        } else if (shouldBe === 'home') {
          address[
            hasNumber.test(component.long_name) ? 'houseNo' : 'buildingName'
          ] = component.long_name;
        } else {
          address[shouldBe] = component.long_name;
        }
      }
    }
  });
  return address;
};

const toLocaleDateString = (date: any) => {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
} 

export const get = (object: any, path: string, defaultValue: any = undefined) => {
  const keys = Array.isArray(path) ? path : path.split('.');

  for (const key of keys) {
    if (object == null || typeof object !== 'object' || !(key in object)) {
      return defaultValue;
    }
    object = object[key];
  }

  return object;
}
