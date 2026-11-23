import { SidebarItem } from '../interfaces';

export class SidebarItemModel {

    constructor(
        public readonly item: SidebarItem
    ) {}

    public hasChildren(): boolean {

        return !!this.item.children?.length;

    }

    public isExternal(): boolean {

        return this.item.external === true;

    }

    public isDisabled(): boolean {

        return this.item.disabled === true;

    }

}