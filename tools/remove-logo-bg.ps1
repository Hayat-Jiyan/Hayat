param(
  [string]$InputPath,
  [string]$OutputPath,
  [byte]$Threshold = 245
)

Add-Type -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;
using System.Collections.Generic;

public static class LogoUtils
{
    private static bool IsNearWhite(int x, int y, int stride, byte threshold, byte[] buffer)
    {
        int idx = y * stride + x * 4;
        byte b = buffer[idx];
        byte g = buffer[idx + 1];
        byte r = buffer[idx + 2];
        return r >= threshold && g >= threshold && b >= threshold;
    }

    private static void EnqueueIfWhite(int x, int y, int w, int h, int stride, byte threshold, byte[] buffer, bool[] visited, Queue<int> queue)
    {
        if (x < 0 || y < 0 || x >= w || y >= h) return;
        int i = y * w + x;
        if (visited[i]) return;
        if (IsNearWhite(x, y, stride, threshold, buffer))
        {
            visited[i] = true;
            queue.Enqueue(i);
        }
    }

    public static void RemoveWhiteBorder(string inputPath, string outputPath, byte threshold)
    {
        using (var src = new Bitmap(inputPath))
        using (var bmp = new Bitmap(src.Width, src.Height, PixelFormat.Format32bppArgb))
        {
            using (var g = Graphics.FromImage(bmp))
            {
                g.DrawImage(src, 0, 0, src.Width, src.Height);
            }

            int w = bmp.Width;
            int h = bmp.Height;
            var rect = new Rectangle(0, 0, w, h);
            var data = bmp.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
            int stride = data.Stride;
            int bytes = Math.Abs(stride) * h;
            byte[] buffer = new byte[bytes];
            Marshal.Copy(data.Scan0, buffer, 0, bytes);

            bool[] visited = new bool[w * h];
            Queue<int> queue = new Queue<int>();

            for (int x = 0; x < w; x++)
            {
                EnqueueIfWhite(x, 0, w, h, stride, threshold, buffer, visited, queue);
                EnqueueIfWhite(x, h - 1, w, h, stride, threshold, buffer, visited, queue);
            }
            for (int y = 0; y < h; y++)
            {
                EnqueueIfWhite(0, y, w, h, stride, threshold, buffer, visited, queue);
                EnqueueIfWhite(w - 1, y, w, h, stride, threshold, buffer, visited, queue);
            }

            while (queue.Count > 0)
            {
                int i = queue.Dequeue();
                int x = i % w;
                int y = i / w;
                int idx = y * stride + x * 4;
                buffer[idx + 3] = 0;
                EnqueueIfWhite(x + 1, y, w, h, stride, threshold, buffer, visited, queue);
                EnqueueIfWhite(x - 1, y, w, h, stride, threshold, buffer, visited, queue);
                EnqueueIfWhite(x, y + 1, w, h, stride, threshold, buffer, visited, queue);
                EnqueueIfWhite(x, y - 1, w, h, stride, threshold, buffer, visited, queue);
            }

            Marshal.Copy(buffer, 0, data.Scan0, bytes);
            bmp.UnlockBits(data);
            bmp.Save(outputPath, ImageFormat.Png);
        }
    }
}
"@ -ReferencedAssemblies System.Drawing

[LogoUtils]::RemoveWhiteBorder($InputPath, $OutputPath, $Threshold)
