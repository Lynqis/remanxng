export var lastId = 0;

export function UniqueComponentId(prefix = 'rx_id_') {
  lastId++;

  return `${prefix}${lastId}`;
}
