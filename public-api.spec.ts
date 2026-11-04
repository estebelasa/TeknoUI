import * as teknoui from 'teknoui';

describe('TeknoUI public API', () => {

    const exported = Object.keys(teknoui);

    it('should export every public component, directive and default config', () => {

        expect(exported).toEqual(expect.arrayContaining([
            'TkCardComponent',
            'TkCardHeaderDirective',
            'TkCardContentDirective',
            'TkCardFooterDirective',
            'DEFAULT_CARD_CONFIG',
            'TkTagComponent',
            'DEFAULT_TAG_CONFIG',
            'TkSidebarComponent',
            'DEFAULT_SIDEBAR_CONFIG'
        ]));

    });


    it('should not expose the internal architecture of tk-sidebar', () => {

        const internals = [
            'SidebarState',
            'SidebarActions',
            'SidebarSelectors',
            'TkSidebarHeaderComponent',
            'TkSidebarProfileComponent',
            'TkSidebarNavigationComponent',
            'TkSidebarItemComponent',
            'TkSidebarFooterComponent'
        ];

        expect(exported.filter(name => internals.includes(name))).toEqual([]);

    });

});
