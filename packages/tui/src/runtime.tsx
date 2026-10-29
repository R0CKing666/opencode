import path from "path"

/**
 * Abbreviate a path under the user's home directory.
 *
 * The separator follows the input convention: POSIX-shaped paths stay
 * slash-separated even on Windows, while Windows paths keep backslashes.
 */
export function abbreviateHome(input: string, home: string) {
  if (!home) return input
  const runtime = input.includes("\\") || home.includes("\\") ? path.win32 : path.posix
  const relative = runtime.relative(home, input)
  if (relative === "") return "~"
  if (relative === ".." || relative.startsWith(".." + runtime.sep) || runtime.isAbsolute(relative)) return input
  return "~" + runtime.sep + relative
}
