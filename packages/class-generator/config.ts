const CONFIG = [
  // {
  //   prefix: 'm',
  //   propertyName: 'margin',
  //   map: {

  //   }
  // },
  {
    prefix: '',
    propertyName: 'display',
    map: {
      'block': 'block',
      'inline-block': 'inline-block',
      'inline': 'inline',
      'flex': 'flex',
      'inline-flex': 'inline-flex',
      'grid': 'grid',
      'inline-grid': 'inline-grid',
      'none': 'none',
      'contents': 'contents',
      'flow-root': 'flow-root',
      'table': 'table',
      'table-caption': 'table-caption',
      'table-cell': 'table-cell',
      'table-column': 'table-column',
      'table-column-group': 'table-column-group',
      'table-footer-group': 'table-footer-group',
      'table-header-group': 'table-header-group',
      'table-row': 'table-row',
      'table-row-group': 'table-row-group',
    }
  },
  {
    prefix: 'justify',
    propertyName: 'justify-content',
    map: {
      'start': 'flex-start',
      'end': 'flex-end',
      'center': 'center',
      'between': 'space-between',
      'around': 'space-around',
      'evenly': 'space-evenly',
      'stretch': 'stretch',
      'normal': 'normal'
    }
  },
  {
    prefix: 'items',
    propertyName: 'align-items',
    map: {
      'start': 'flex-start',
      'end': 'flex-end',
      'center': 'center',
      'baseline': 'baseline',
      'stretch': 'stretch'
    }
  },
  {
    prefix: 'self',
    propertyName: 'align-self',
    map: {
      'auto': 'auto',
      'start': 'flex-start',
      'end': 'flex-end',
      'center': 'center',
      'stretch': 'stretch',
      'baseline': 'baseline'
    }
  },
  {
    prefix: 'flex',
    propertyName: 'flex',
    map: {
      '1': '1 1 0%',
      'auto': '1 1 auto',
      'initial': '0 1 auto',
      'none': 'none'
    }
  },
  { 
    prefix: 'font',
    propertyName: 'font-weight',
    map: {
      'thin': '100',
      'extralight': '200',
      'light': '300',
      'normal': '400',
      'medium': '500',
      'semibold': '600',
      'bold': '700',
      'extrabold': '800',
      'black': '900'
    }
  },
  {
    prefix: 'overflow',
    propertyName: 'overflow',
    map: {
      'auto': 'auto',
      'hidden': 'hidden',
      'clip': 'clip',
      'visible': 'visible',
      'scroll': 'scroll'
    }
  }
]

export default CONFIG;
