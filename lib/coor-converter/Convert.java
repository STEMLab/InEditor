import java.io.*;
import java.util.*;
import org.gdal.gdal.GCP;
import org.gdal.gdal.gdal;
import org.gdal.osr.CoordinateTransformation;
import org.gdal.osr.SpatialReference;


//
// Usage for poets.
//
// 0. Working folder is
//    C:\ConvertTool
//    (C:\ConvertTool\Convert.java...)
//
// 1. Download GDAL (Compiled binaries in a single .zip package)
//    http://www.gisinternals.com/query.html?content=filelist&file=release-1900-x64-gdal-2-4-0-mapserver-7-2-2.zip
//
// 2. Extract zip file to C:\gdal
//
// 3. Copy C:\gdal\bin\gdal\java\gdalalljni.dll
//      to C:\gdal\bin
//
// 4. Add Path
//   "C:\gdal\bin"
//   "C:\gdal\bin\gdal\apps"
//
// 5. Set environment value GDAL_DATA=C:\gdal\bin\gdal-data
//
// 6. Compile
//    javac Convert.java -classpath c:\gdal\bin\gdal\java\gdal.jar
//
// 7. Run with samples
//    java -cp .;c:\gdal\bin\gdal\java\gdal.jar Convert GCP-201-IndoorGML.txt TARGET-IndoorGML.txt result.txt
//    java -cp .;c:\gdal\bin\gdal\java\gdal.jar Convert GCP-201-Pixel.txt TARGET-Pixel.txt result-pixel.txt
//


public class Convert {
    public static void main(String[] args) {
        File inGcpsFile = null;
        File inPointsFile = null;
        File outResultFile = null;
        ArrayList<GCP> listGCP = new ArrayList<GCP>();

        if (3 == args.length) {
            inGcpsFile = new File(args[0]);
            inPointsFile = new File(args[1]);
            outResultFile = new File(args[2]);
        } else {
            System.err.println("Usage: java -classpath {Path of Convert.class};{Path of gdal.jar}\\gdal.jar Convert [GCPs file] [input points file] [output file]");
            System.err.println("Example: java -classpath C:\\ConvertTool\\out;C:\\ConvertTool\\gdal.jar Convert [GCPs file] [input points file] [output file]");
            System.exit(-1);
        }

        try {
            Scanner scan = new Scanner(inGcpsFile,"euc-kr");

            while(scan.hasNextLine()) {
                String line = scan.nextLine();
                if (line.startsWith("#") || line.length() == 0) {
                    continue;
                }
                String[] tokens = line.split(",");
                double longi = Double.parseDouble(tokens[0]);
                double lati = Double.parseDouble(tokens[1]);
                double Xpixel = Double.parseDouble(tokens[2]);
                double Yline = Double.parseDouble(tokens[3]);

                listGCP.add(new GCP(longi, lati, Xpixel, Yline));
            }
        } catch (FileNotFoundException e) {
            System.err.println(e);
            System.exit(1);
        }

        double myGT[] = new double[6];
        GCP[] arrayGCP = listGCP.toArray(new GCP[listGCP.size()]);

        gdal.GCPsToGeoTransform(arrayGCP, myGT, 0);

        try {
            Scanner scan = new Scanner(inPointsFile, "euc-kr");
            BufferedWriter out = new BufferedWriter(new FileWriter(outResultFile));
            int cnt = 0;
            while(scan.hasNextLine()) {
                String line = scan.nextLine();
                if (line.startsWith("#") || line.length() == 0) {
                    continue;
                }
                cnt++;
                String[] tokens = line.split(",");
                double Xpoint = Double.parseDouble(tokens[0]);
                double Yline = Double.parseDouble(tokens[1]);

                double resultX = myGT[0] + Xpoint * myGT[1] + Yline * myGT[2];
                double resultY = myGT[3] + Xpoint * myGT[4] + Yline * myGT[5];
				
                SpatialReference s_srs = new SpatialReference();
                SpatialReference t_srs = new SpatialReference();
                s_srs.ImportFromEPSG(4326);
                t_srs.ImportFromEPSG(3857);

                CoordinateTransformation ct =  CoordinateTransformation.CreateCoordinateTransformation(s_srs, t_srs);

                double[] epsg3857 = ct.TransformPoint(resultX, resultY);
				
                // System.out.println(String.format("[%.6f %.6f]", epsg3857[0], epsg3857[1]));
                ////////////////////////////////////////////////////////////////
		    
                // If you want EPSG:3857 use a line below.
                //
                //out.write(String.format("%.8f, %.8f", epsg3857[0], epsg3857[1]));
                //
		    
                // If you want EPSG:4326 use a line below.
                out.write(String.format("%f, %f", resultX, resultY));

                out.newLine();
                ////////////////////////////////////////////////////////////////
            }
            System.out.println(String.format("Converting job finish: %s (%d points)", outResultFile.getName(), cnt));
            out.close();
        } catch (IOException e) {
            System.err.println(e);
            System.exit(1);
        }
    }
}