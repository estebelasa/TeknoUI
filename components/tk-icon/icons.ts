/**
 * TeknoUI icon set: 24x24 line icons, 2px round strokes, drawn with
 * currentColor. Same geometric style as the <el> brand mark.
 */
export const TK_ICONS = {
    home: 'M3 11L12 4L21 11 M5 9.5V20H19V9.5 M10 20V14H14V20',
    user: 'M12 12a4 4 0 1 0 0-8a4 4 0 1 0 0 8Z M4 20c0-3.5 3.6-6 8-6s8 2.5 8 6',
    briefcase: 'M5 7H19a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z M9 7V5H15V7 M3 13H21',
    code: 'M8 7L3 12L8 17 M16 7L21 12L16 17',
    folder: 'M3 7a2 2 0 0 1 2-2H9L11 7H19a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z',
    mail: 'M5 5H19a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z M3 7L12 13L21 7'
} as const;

export type TkIconName = keyof typeof TK_ICONS;
