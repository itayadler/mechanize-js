'use strict';
const {URL} = require('url');

exports.newLink = ({node, agent, page}) => {
  agent = agent || page.agent;
  const nodeAttr = ({node, name}) => {
      if (node && node.attr) {
        return node.attr(name) && node.attr(name).value();
      } else if (node) {
        return node[name];
      }
      return undefined;
    },

    href = nodeAttr({node, name: 'href'}),

    relVal = nodeAttr({node, name: 'rel'}),

    rel = relVal ? relVal.toLowerCase().split(' ') : [],

    relIncludes = kind => rel.includes(kind),

    click = () => agent.click(link),

    attributes = {},

    search = xpath => node ? node.find(xpath) : [],

    text = () => node.text() || node
      .find('//img')
      .map(node => nodeAttr({node, name: 'alt'}))
            .join(''),

    uri = page.resolveUrl(href),

    getPage = options => agent.get(Object.assign({uri}, options)),

    link = Object.freeze({
      attributes: node,
      domClass: nodeAttr({node, name: 'class'}),
      domId: nodeAttr({node, name: 'id'}),
      getPage,
      href,
      node,
      page,
      referer: page,
      rel,
      relIncludes,
      search,
      text,
      toString: text,
      uri
    });

  return link;
};
