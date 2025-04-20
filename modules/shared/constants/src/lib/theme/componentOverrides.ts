import { Theme } from '@mui/material/styles';

// @ts-nocheck
function componentStyleOverrides(theme: any) {
  const n = theme.palette.mode,
    // @ts-ignore
    a = n === 'dark' ? theme.palette.dark[800] : theme.palette.grey[50],
    o =
      n === 'dark' ? theme.palette.secondary.main + 15 : theme.palette.secondary.light,
    s = n === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark;
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: '4px',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          // @ts-ignore
          borderRadius: `${theme?.customization?.borderRadius}px`,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          // @ts-ignore
          color: theme.palette.text.dark,
          padding: '24px',
        },
        title: {
          fontSize: '1.125rem',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          alignItems: 'center',
        },
        outlined: {
          border: '1px dashed',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
          paddingTop: '10px',
          paddingBottom: '10px',
          '&.Mui-selected': {
            color: s,
            backgroundColor: o,
            '&:hover': {
              backgroundColor: o,
            },
            '& .MuiListItemIcon-root': {
              color: s,
            },
          },
          '&:hover': {
            backgroundColor: o,
            color: s,
            '& .MuiListItemIcon-root': {
              color: s,
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
          minWidth: '36px',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          // @ts-ignore
          color: theme.palette.text.dark,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          // @ts-ignore
          color: theme.palette.text.dark,
          '&::placeholder': {
            color: theme.palette.text.secondary,
            fontSize: '0.875rem',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: 'light' ? a : 'transparent',
          // @ts-ignore
          borderRadius: `${theme?.customization?.borderRadius}px`,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor:
              n === 'dark' ? theme.palette.text.primary + 28 : theme.palette.grey[400],
          },
          '&:hover $notchedOutline': {
            borderColor: theme.palette.primary.light,
          },
          '&.MuiInputBase-multiline': {
            padding: 1,
          },
        },
        input: {
          fontWeight: 500,
          background: 'light' ? a : 'transparent',
          padding: '15.5px 14px',
          // @ts-ignore
          borderRadius: `${theme?.customization?.borderRadius}px`,
          '&.MuiInputBase-inputSizeSmall': {
            padding: '10px 14px',
            '&.MuiInputBase-inputAdornedStart': {
              paddingLeft: 0,
            },
          },
        },
        inputAdornedStart: {
          paddingLeft: 4,
        },
        notchedOutline: {
          // @ts-ignore
          borderRadius: `${theme?.customization?.borderRadius}px`,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color:
              n === 'dark' ? theme.palette.text.primary + 50 : theme.palette.grey[300],
          },
        },
        mark: {
          backgroundColor: theme.palette.background.paper,
          width: '4px',
        },
        valueLabel: {
          color:
            n === 'dark' ? theme.palette.primary.main : theme.palette.primary.light,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiAutocomplete-tag': {
            background:
              n === 'dark'
                ? theme.palette.text.primary + 20
                : theme.palette.secondary.light,
            borderRadius: 4,
            // @ts-ignore
            color: theme.palette.text.dark,
            '.MuiChip-deleteIcon': {
              color:
                n === 'dark'
                  ? theme.palette.text.primary + 80
                  // @ts-ignore
                  : theme.palette.secondary[200],
            },
          },
        },
        popper: {
          // @ts-ignore
          borderRadius: `${theme?.customization?.borderRadius}px`,
          boxShadow:
            '0px 8px 10px -5px rgb(0 0 0 / 20%), 0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: theme.palette.divider,
          opacity: n === 'dark' ? 0.2 : 1,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          '&:focus': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          // @ts-ignore
          color: n === 'dark' ? theme.palette.dark.main : theme.palette.primary.dark,
          background:
          // @ts-ignore
            n === 'dark' ? theme.palette.text.primary : theme.palette.primary[200],
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-deletable .MuiChip-deleteIcon': {
            color: 'inherit',
          },
        },
      },
    },
    MuiTimelineContent: {
      styleOverrides: {
        root: {
          // @ts-ignore
          color: theme.palette.text.dark,
          fontSize: '16px',
        },
      },
    },
    MuiTreeItem: {
      styleOverrides: {
        label: {
          marginTop: 14,
          marginBottom: 14,
        },
      },
    },
    MuiTimelineDot: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiInternalDateTimePickerTabs: {
      styleOverrides: {
        tabs: {
          backgroundColor:
          // @ts-ignore
            n === 'dark' ? theme.palette.dark[900] : theme.palette.primary.light,
          '& .MuiTabs-flexContainer': {
            borderColor:
              n === 'dark'
                ? theme.palette.text.primary + 20
                // @ts-ignore
                : theme.palette.primary[200],
          },
          '& .MuiTab-root': {
            color:
              n === 'dark' ? theme.palette.text.secondary : theme.palette.grey[900],
          },
          '& .MuiTabs-indicator': {
            backgroundColor: theme.palette.primary.dark,
          },
          '& .Mui-selected': {
            color: theme.palette.primary.dark,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        flexContainer: {
          borderBottom: '1px solid',
          borderColor:
            n === 'dark' ? theme.palette.text.primary + 20 : theme.palette.grey[200],
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          padding: '12px 0 12px 0',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor:
            n === 'dark' ? theme.palette.text.primary + 15 : theme.palette.grey[200],
          '&.MuiTableCell-head': {
            fontSize: '0.875rem',
            color: n === 'dark' ? theme.palette.grey[600] : theme.palette.grey[900],
            fontWeight: 500,
          },
        },
      },
    },
    MuiDateTimePickerToolbar: {
      styleOverrides: {
        timeDigitsContainer: {
          alignItems: 'center',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: theme.palette.background.paper,
          background: theme.palette.text.primary,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.25rem',
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          margin: '3px',
        },
      },
    },
    MuiDataGrid: {
      defaultProps: {
        rowHeight: 54,
      },
      styleOverrides: {
        root: {
          border: 'none',
          '& .MuiFormControl-root>.MuiInputBase-root': {
            backgroundColor: theme.palette.background.default + ' !important',
            borderColor:
              theme.palette.mode === 'dark'
                ? theme.palette.divider + 20 + ' !important'
                : theme.palette.divider + ' !important',
          },
        },
        row: {
          borderBottom: `1px solid ${
            n === 'dark' ? theme.palette.divider + 20 : theme.palette.divider
          }`,
        },
        columnHeader: {
          color: theme.palette.grey[600],
          paddingLeft: 24,
          paddingRight: 24,
          borderBottom: `1px solid ${
            n === 'dark' ? theme.palette.divider + 20 : theme.palette.divider
          }`,
        },
        columnHeaderCheckbox: {
          paddingLeft: 0,
          paddingRight: 0,
        },
        cellCheckbox: {
          paddingLeft: 0,
          paddingRight: 0,
        },
        cell: {
          border: 'none',
          paddingLeft: 24,
          paddingRight: 24,
          '&.MuiDataGrid-cell--withRenderer > div ': {
            ...(theme.palette.mode === 'dark' && {
              color: theme.palette.grey[50],
            }),
            ' > .high': {
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.success.dark
                  : theme.palette.success.light,
            },
            '& > .medium': {
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.warning.dark
                  : theme.palette.warning.light,
            },
            '& > .low': {
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.error.dark
                  : theme.palette.error.light,
            },
          },
        },
        columnsContainer: {
          borderColor:
            n === 'dark' ? theme.palette.divider + 20 : theme.palette.divider,
        },
        columnSeparator: {
          borderColor:
            n === 'dark' ? theme.palette.divider + 20 : theme.palette.divider,
        },
        withBorderColor: {
          borderColor:
            n === 'dark' ? theme.palette.divider + 20 : theme.palette.divider,
        },
      },
    },
  };
}

// const qb = (theme: Theme, t: number) => {
//   const r = et(t, 0.24);
//   return {
//     z1: `0 1px 2px 0 ${r}`,
//     z8: `0 8px 16px 0 ${r}`,
//     z12: `0 12px 24px 0 ${r} 0 10px 20px 0 ${r}`,
//     z16: `0 0 3px 0 ${r} 0 14px 28px -5px ${r}`,
//     z20: `0 0 3px 0 ${r} 0 18px 36px -5px ${r}`,
//     z24: `0 0 6px 0 ${r} 0 21px 44px 0 ${r}`,
//     primary: `0px 12px 14px 0px ${et(theme.palette.primary.main, 0.3)}`,
//     secondary: `0px 12px 14px 0px ${et(theme.palette.secondary.main, 0.3)}`,
//     orange: `0px 12px 14px 0px ${et(theme.palette.orange.main, 0.3)}`,
//     success: `0px 12px 14px 0px ${et(theme.palette.success.main, 0.3)}`,
//     warning: `0px 12px 14px 0px ${et(theme.palette.warning.main, 0.3)}`,
//     error: `0px 12px 14px 0px ${et(theme.palette.error.main, 0.3)}`,
//   };
// };

// const $he = (mode: string, theme: Theme) => {
//   return mode === 'dark'
//     ? qb(theme, theme.palette.dark.main)
//     : qb(theme, theme.palette.grey[900]);
// };

export default componentStyleOverrides;
