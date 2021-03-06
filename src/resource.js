const { getArg } = require('./arg-helper');
const { Handler } = require('./handler');

class Resource {
  static init(server) {
    const resourcesStr = getArg('resources');

    let useDefaultResources = true;

    if (resourcesStr) {
      const resources = resourcesStr.split(',');

      if (resources.length) {
        resources.forEach(resource => Resource.add(resource.toLowerCase(), server));
        useDefaultResources = false;
      }
    }

    if (useDefaultResources) {
      Resource.add('users', server);
      Resource.add('posts', server);
    }
  }

  static add(type, server) {
    const handler = new Handler(type);

    server.post(`/${type}`, handler.create.bind(handler));
    server.get(`/${type}/:id`, handler.read.bind(handler));
    server.get(`/${type}`, handler.readAll.bind(handler));
    server.put(`/${type}/:id`, handler.update.bind(handler));
    server.del(`/${type}/:id`, handler.delete.bind(handler));
  }
}

module.exports = {
  Resource,
};