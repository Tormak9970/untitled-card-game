/**
 * Untitled Card Game is a solitaire game made with TypeScript and Svelte.
 * Copyright (C) 2023 Travis Lane (Tormak)
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>
 */
import { toast } from "@zerodevx/svelte-toast"
/**
 * Handles displaying toasts
 */
export class ToastController {
  constructor() {}

  private getAppToastTheme() {
    return {
      "--toastBackground": "#d87e08",
      "--toastBarBackground": "#ff6600",
      "--toastColor": "rgb(231, 231, 231)",
      "--toastBorderRadius": "6px"
    }
  }

  private getSuccessToastTheme() {
    return {
      "--toastBackground": "#27b803",
      "--toastBarBackground": "#108b00",
      "--toastColor": "rgb(231, 231, 231)",
      "--toastBorderRadius": "6px"
    }
  }

  private getWarningToastTheme() {
    return {
      "--toastBackground": "#e24a4a",
      "--toastBarBackground": "#e13525",
      "--toastColor": "rgb(231, 231, 231)",
      "--toastBorderRadius": "6px"
    }
  }

  /**
   * Creates and displays a new loading toast with the provided message
   * @param msg The message to show
   * @returns The id of the created loading toast
   */
  showLoaderToast(msg:string):number {
    return toast.push(msg, {
      theme: this.getAppToastTheme(),
      dismissable: false,
      duration: 100000
    });
  }

  /**
   * Removes the loading toast with the specified id
   * @param loaderId The id of the loading toast
   */
  remLoaderToast(loaderId:number) {
    toast.pop(loaderId);
  }

  /**
   * Creates and displays a new success toast with the provided message
   * @param msg The message to show
   */
  showSuccessToast(msg:string) {
    toast.push(msg, {
      theme: this.getSuccessToastTheme(),
      dismissable: false,
      duration: 1500
    });
  }

  /**
   * Creates and displays a new warning toast with the provided message
   * @param msg The message to show
   */
  showWarningToast(msg:string) {
    toast.push(msg, {
      theme: this.getWarningToastTheme(),
      dismissable: false,
      duration: 1500
    });
  }

  /**
   * Creates and displays a new generic toast with the provided message and styles
   * @param msg The message to show
   * @param styles Optional styling to apply to the toast
   */
  showGenericToast(msg:string, styles:object = {}) {
    toast.push(msg, {
      theme: {
        ...this.getAppToastTheme(),
        ...styles
      }
    });
  }
}